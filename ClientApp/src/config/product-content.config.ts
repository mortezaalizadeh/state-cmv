import { IProductContentConfig } from '../models/product'

export const ProductContentConfig: IProductContentConfig[] = [
  {
    brand: "AMI",
    config:[
      {
        "id": "P004",
        "iconLink": "ic-vehicle",
        "title": "Business Vehicle",
        "category": "Cover for vehicles",
        "description": "This covers your vehicles to keep you and your business moving. Your business vehicles can be covered for different levels of cover, like Comprehensive, Third Party Fire and Theft and Third Party only.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-vehicle",
        "infoText": "Vehicle cover will be calculated later in the process",
        "referredMessages": [
          {
            "code": "default",
            "message": "You'll need to speak to us to take out this cover. Get in touch on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a>."
          },
          {
            "code": "vehicleMaxExceeded",
            "message": "Because of the number of vehicles you have, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for loss or damage to your business vehicles.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Commercial Vehicle",
        "analyticsLogAsMainProduct": false,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P001",
        "iconLink": "ic-publicliability",
        "title": "Public Liability (Broadform)",
        "category": "Cover for Legal Liability",
        "descriptor": "Public",
        "description": "This covers you for legal liability for accidental injury to a person or accidental damage to other people's property caused by you or your employees while you're doing business.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance#business-liability",
        "referredMessages": [
          {
            "code": "default",
            "message": "As a [occupation], we need to understand your business a little better before we provide a quote for this cover. Please give us a call on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> to speak to one of our Business Specialists."
          },
          {
            "code": "turnoverMaxExceeded",
            "message": "Because of your business's annual gross turnover, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "employeeMaxExceeded",
            "message": "Because of the number of employees you have, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "turnoverEmployeeMaxExceeded",
            "message": "Because of your business's annual gross turnover and the number of employees you have, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "publicLiabilityCoverMoreThan2M",
            "message": "Because you'd like cover for more than $2,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for legal costs and certain fines if you accidentally injure or damage other people or their property.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Liability",
        "analyticsLogAsMainProduct": false,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P002",
        "iconLink": "ic-statutoryliability",
        "title": "Statutory Liability",
        "category": "Cover for Legal Liability",
        "descriptor": "Statutory",
        "description": "This covers legal costs and fines you could face if you unintentionally break the law.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-liability",
        "referredMessages": [
          {
            "code": "default",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "turnoverMaxExceeded",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "employeeMaxExceeded",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "turnoverEmployeeMaxExceeded",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "publicLiabilityCoverMoreThan2M",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "statutoryLiabilityCoverMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for legal defense costs and certain fines if you accidentally breach legislation.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Liability",
        "analyticsLogAsMainProduct": true,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P003",
        "iconLink": "ic-employersliability",
        "title": "Employer's Liability",
        "category": "Cover for Legal Liability",
        "descriptor": "Employer's",
        "description": "This covers you for legal liability if your employees (excluding owner) are injured in a workplace accident and are not covered by ACC.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-liability",
        "referredMessages": [
          {
            "code": "default",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "turnoverMaxExceeded",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "employeeMaxExceeded",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "turnoverEmployeeMaxExceeded",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "publicLiabilityCoverMoreThan2M",
            "message": "Because this policy is only available in combination with a Public Liability (Broadform) policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "employersLiabilityCoverMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for legal liability if your employees are injured and it's not covered by ACC.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Liability",
        "analyticsLogAsMainProduct": true,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P005",
        "iconLink": "ic-mobileequipment",
        "title": "Mobile Assets",
        "category": "Cover for Business Assets",
        "description": "This covers your tools, mobile business equipment, and stock or inventory against loss or damage occurring anywhere in New Zealand.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-assets",
        "referredMessages": [
          {
            "code": "default",
            "message": "As a [occupation], we need to understand your business a little better before we provide a quote for this cover. Please give us a call on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> to speak to one of our Business Specialists."
          },
          {
            "code": "totalContentsAndStockForMobileAssetsIsMoreThanOrEqualTo50K",
            "message": "Because you'd like cover for more than $50,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for sudden and accidental loss to your mobile business assets when you are out and about.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Mobile Business Assets",
        "analyticsLogAsMainProduct": true,
        "analyticsAddNaturalDisaster": true
      },
      {
        "id": "P006",
        "iconLink": "ic-building",
        "title": "Business Building",
        "category": "Cover for Business Assets",
        "descriptor": "Building",
        "description": "This covers the buildings you own and service facilities, signs, walls, gates, fences, paving and landscaping.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-assets",
        "referredMessages": [
          {
            "code": "default",
            "message": "As a [occupation], we need to understand your business a little better before we provide a quote for this cover. Please give us a call on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> to speak to one of our Business Specialists."
          },
          {
            "code": "totalBuildingCoverMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "totalOfContentsAndStockForBusinessAssetsIsMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for sudden and accidental loss to your business assets.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Business Assets",
        "analyticsLogAsMainProduct": false,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P007",
        "iconLink": "ic-content",
        "title": "Business Contents",
        "category": "Cover for Business Assets",
        "descriptor": "Contents",
        "description": "This covers you for loss or damage to your contents and equipment while it's at your business premises.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-assets",
        "referredMessages": [
          {
            "code": "default",
            "message": "As a [occupation], we need to understand your business a little better before we provide a quote for this cover. Please give us a call on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> to speak to one of our Business Specialists."
          },
          {
            "code": "totalBuildingCoverMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "totalOfContentsAndStockForBusinessAssetsIsMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for sudden and accidental loss to your business assets.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Business Assets",
        "analyticsLogAsMainProduct": false,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P008",
        "iconLink": "ic-stock",
        "title": "Business Stock",
        "category": "Cover for Business Assets",
        "descriptor": "Stock",
        "description": "This covers you for loss or damage to your stock or inventory while at your business premises.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-assets",
        "referredMessages": [
          {
            "code": "default",
            "message": "As a [occupation], we need to understand your business a little better before we provide a quote for this cover. Please give us a call on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> to speak to one of our Business Specialists."
          },
          {
            "code": "totalBuildingCoverMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "totalOfContentsAndStockForBusinessAssetsIsMoreThan1M",
            "message": "Because you'd like cover for more than $1,000,000, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for sudden and accidental loss to your business assets.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Business Assets",
        "analyticsLogAsMainProduct": false,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P009",
        "iconLink": "ic-interruption",
        "title": "Business Interruption",
        "category": "Cover for Business Assets",
        "description": "This covers you if accidental loss or damage leads to loss of income or profit for your business. This could be because of damage to your premises or loss or damage to your equipment.",
        "moreInfoLinkText": "Read more",
        "moreInfoLink": "https://www.ami.co.nz/business/all-insurance/#business-interruption",
        "infoText": "Business Interruption cover will be calculated later in the process",
        "referredMessages": [
          {
            "code": "default",
            "message": "Because this policy is only available in combination with another Business Assets policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "totalBuildingCoverMoreThan1M",
            "message": "Because this policy is only available in combination with another Business Assets policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          },
          {
            "code": "totalOfContentsAndStockForBusinessAssetsIsMoreThan1M",
            "message": "Because this policy is only available in combination with another Business Assets policy, it�s best to chat to one of our Business Specialists over the phone before we provide a quote for this cover. Please call us on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> Mon-Fri 8am-6pm."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "removalConfirmationMessage": "This means you will not be covered for loss of income or profit if you're unable to trade after an accidental loss.",
        "offered": true,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Business Assets",
        "analyticsLogAsMainProduct": true,
        "analyticsAddNaturalDisaster": true
      },
      {
        "id": "P011",
        "iconLink": "ic-professionalindemnity",
        "title": "Professional Indemnity",
        "category": "Other covers you need",
        "description": "This covers your business for the risks associated with providing advice and professional services. This includes liability and associated defence costs.",
        "referredMessages": [
          {
            "code": "default",
            "message": "We currently don�t offer this product through AMI, however it's important you have the right cover in place in order to protect you in the event of a claim against your business. We recommend you contact a broker to find out if this cover is right for you. <a class='refer-link' target='_blank' href='https://www.nzi.co.nz/en/find-a-broker.html'>Visit NZI</a> for more information."
          }
        ],
        "quoteReferredMessage": "We currently don't offer this product through AMI, however it's important that you have the right cover in place in order to protect you in the event of a claim against your business. We recommend you contact a broker to find out if this cover is right for you. <a class='nzi-link' target='_blank' href='https://www.nzi.co.nz/en/find-a-broker.html'>Visit NZI</a> for more information.",
        "offered": false,
        "optionalProductsMessage": "Contact a broker through <a class='nzi-link' target='_blank' href='https://www.nzi.co.nz/en/find-a-broker.html'>NZI</a> for more information",
        "analyticsCategory": "Professional Indemnity",
        "analyticsLogAsMainProduct": true,
        "analyticsAddNaturalDisaster": false
      },
      {
        "id": "P017",
        "iconLink": "ic-carrier",
        "title": "Carrier's Liability",
        "category": "Other covers you need",
        "description": "This cover protects against liability for loss or damage to goods while loading, unloading, or in transit wherever you are in New Zealand and subject to the relevant act.",
        "referredMessages": [
          {
            "code": "default",
            "message": "As a [occupation], we need to understand your business a little better before we provide a quote for this cover. Please give us a call on <a class='refer-link' href='tel:0800 782 838'>0800 782 838</a> to speak to one of our Business Specialists."
          }
        ],
        "quoteReferredMessage": "Thanks for telling us about your business - it sounds like for your situation, it's best to have a chat over the phone with one of our Business Specialist before we provide a quote for this cover.<br/><br/>The price for this product is not included in the quote above. ",
        "offered": false,
        "optionalProductsMessage": "Call us on <a class='nzi-link' target='_blank' href='#'>0800 782 838</a> to get a quote for this cover",
        "analyticsCategory": "Liability",
        "analyticsLogAsMainProduct": true,
        "analyticsAddNaturalDisaster": false
      }
    ]
  }

]