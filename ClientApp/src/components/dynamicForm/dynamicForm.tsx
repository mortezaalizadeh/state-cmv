import React, { createRef, Fragment, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { IQuestionInstance, IQuestionInstanceRef } from '../../models/question'
import { IBusinessType as BusinessType } from '../../models/businessType'
import { AnswerUpdatedEvent } from '../../models/answer'
import * as validator from './answers/validators/answer'
import * as controlSelector from './helpers/controlSelector'
import {isQuestionActive} from './helpers/isQuestionActive'

const DynamicForm = React.memo(
  (props: {
    questionInstances?: IQuestionInstance[]
    businessTypes?: BusinessType[]
    onSubmitButtonClicked?: (
      answersUpdated: AnswerUpdatedEvent[],
      questionInstances: IQuestionInstance[]
    ) => Promise<boolean>
  }) => {
    // DynamicForm and its children must be detached from the global state so they can be reused in different projects
    const [allQuestions, setAllQuestions] = useState<IQuestionInstance[]>([]);
    const [questionRefs, setQuestionRefs] = useState([] as IQuestionInstanceRef[]);
    const [answers, setAnswers] = useState<AnswerUpdatedEvent[]>([]);

    // Reset the list of questions when the parent updates the question instances
    // The new/removed/updated questions are propogated through all the Answer components
    useEffect(() => {
        if (props.questionInstances) {
          const [flattendQuestions, questionRefs] = flattenQuestionInstances(props.questionInstances);
          setAllQuestions(flattendQuestions);
          setQuestionRefs(questionRefs);
          setAnswers([]);
        }
      },
      [props.questionInstances]);

    /* Flattens all nested question instances into a single array and creates a React ref for each one
     * This is so the form won't need to recursively search the question instance tree each time to update an answer
     * The refs allow Dynamic Form to scroll to specific questions to highlight errors to the user
     */
    function flattenQuestionInstances(
      questionInstances: IQuestionInstance[]
    ): [IQuestionInstance[], IQuestionInstanceRef[]] {
      let flattend = [] as IQuestionInstance[];
      let refs = [] as IQuestionInstanceRef[];

      questionInstances.forEach(makeFlat);
      return [flattend, refs];

      function makeFlat(questionInstance: IQuestionInstance) {
        flattend.push(questionInstance);
        refs.push({ id: questionInstance.id, ref: createRef() });

        questionInstance.questionInstances?.forEach(makeFlat);
      }
    }

    function findRef(questionInstanceId: string) {
      return questionRefs.find((x) => x.id === questionInstanceId)?.ref;
    }

    // Event Handlers

    /*
     * When a user enters answers into an Answer component it will call this function via props
     * HandleOnAnswerChange takes the event from the Answer component, validates it and records the answer
     * which will be sent to the parent on submission
     */
    function handleOnAnswerChange(event: AnswerUpdatedEvent) {
      // Mapping through all questions in the array when I only need to update one item
      // This is neccessary as changing the item directly in allQuestions breaks immuatability (and doesn't work)
      // TODO - Such a gross way to update a single item, look into using a reducer?
      let validationPassed = true
      let validatedQuestions = allQuestions.map((question) => {
        if (question.id !== event.questionInstanceId) {
          return question
        }

        // Validate the answer and set an error status if its not valid
        question.answer = event.answer
        const result = validator.validateQuestionInstance(question)

        if (result && !result.isValid) {
          question.error = result.error
          validationPassed = false
        } else {
          // The answer is valid so clear any exisitng errors
          question.error = ''
        }

        return question
      })

      setAllQuestions(validatedQuestions)
      if (!validationPassed) {
        return
      }

      // The answer is valid so add the event to the list of answers to update which will be sent back
      // to the parent on submission
      const answerEventExists = answers.find((x) => x.questionInstanceId === event.questionInstanceId)
      const updatedAnswers = answerEventExists
        ? answers.map((answer) => (answer.questionInstanceId === event.questionInstanceId ? event : answer))
        : answers.concat(event)

      setAnswers(updatedAnswers)
    }

    /*
     * When the submit button is clicked this function checks that all questions have valid answers
     * It will then return the list of AnswerUpdated events back to the parent and waits for its response
     * If the response indicates success then the AnswerUpdated list is cleared otherwise it is kept in case the user
     * tries to resubmit
     */
    async function handleGetQuoteButtonOnClick() {
      // Validate all questions and set error statues on each question that fails that aren't valid
      let validationPassed = true
      let shouldScrollToError = true
      let validatedQuestions = allQuestions.map((question) => {
        if (!isQuestionActive(allQuestions, question.askIf)) {
          return question
        }

        const result = validator.validateQuestionInstance(question)
        if (result && !result.isValid) {
          question.error = result.error
          validationPassed = false

          // Scroll to the top most error on the form
          if (shouldScrollToError) {
            findRef(question.id)?.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            shouldScrollToError = false
          }
        }

        return question
      })

      // Only pass the Answers array to the parent when the form is completed and correct
      if (!validationPassed) {
        setAllQuestions(validatedQuestions)
        return
      }

      // The form is complete and valid so send the list of Answer updates to the parent.
      // The parent returns false to indicate that that something went wrong
      // so we persist the answers in case they try submnitting again
      if (props.onSubmitButtonClicked) {
        if (await props.onSubmitButtonClicked(answers, allQuestions)) {
          setAnswers([])
        }
      }
    }

    return (
      <>

        {/** Display questions */}
        {allQuestions?.length > 0 && (
          <>
            {allQuestions.map((questionInstance) => {
              return (
                <Fragment key={questionInstance.id}>
                  {controlSelector.renderControl(
                    questionInstance,
                    handleOnAnswerChange,
                    allQuestions,
                    props.businessTypes,
                    findRef(questionInstance.id)
                  )}
                </Fragment>
              )
            })}
          </>
        )}
      </>
    )
  }
)

export default DynamicForm
