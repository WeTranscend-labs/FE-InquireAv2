export const contractABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'answerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'responder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'answerText',
        type: 'string',
      },
    ],
    name: 'AnswerSubmitted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_questionText',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_questionContent',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_category',
        type: 'string',
      },
      {
        internalType: 'enum InquireType.DeadlinePeriod',
        name: '_deadlinePeriod',
        type: 'uint8',
      },
    ],
    name: 'askQuestion',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'answerId',
        type: 'uint256',
      },
    ],
    name: 'closeQuestion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
    ],
    name: 'distributeRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'questionText',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
    ],
    name: 'QuestionAsked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'chosenAnswerId',
        type: 'uint256',
      },
    ],
    name: 'QuestionClosed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'answerId',
        type: 'uint256',
      },
    ],
    name: 'selectBestAnswer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_answerText',
        type: 'string',
      },
    ],
    name: 'submitAnswer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'answerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
    ],
    name: 'Voted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'answerId',
        type: 'uint256',
      },
    ],
    name: 'voteForAnswer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'answerIdCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'answers',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'responder',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'answerText',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'upvotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'balance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'balances',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'answerId',
        type: 'uint256',
      },
    ],
    name: 'getAnswerById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'responder',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'answerText',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'upvotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewardAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct InquireType.Answer',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pageIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pageSize',
        type: 'uint256',
      },
    ],
    name: 'getAnswersByQuestionId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'responder',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'answerText',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'upvotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewardAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct InquireType.Answer[]',
        name: 'answersList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'totalAnswers',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalPages',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'questionId',
        type: 'uint256',
      },
    ],
    name: 'getQuestionById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'asker',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'questionText',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'questionContent',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'category',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'rewardAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClosed',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'chosenAnswerId',
            type: 'uint256',
          },
        ],
        internalType: 'struct InquireType.Question',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pageIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pageSize',
        type: 'uint256',
      },
    ],
    name: 'getQuestions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'asker',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'questionText',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'questionContent',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'category',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'rewardAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClosed',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'chosenAnswerId',
            type: 'uint256',
          },
        ],
        internalType: 'struct InquireType.Question[]',
        name: 'questionsList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'totalQuestions',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalPages',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_category',
        type: 'string',
      },
    ],
    name: 'getQuestionsByCategory',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUser',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'reputation',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'answerCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'questionCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bestSolutionCount',
            type: 'uint256',
          },
        ],
        internalType: 'struct InquireType.User',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pageIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pageSize',
        type: 'uint256',
      },
    ],
    name: 'getUsers',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'reputation',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'answerCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'questionCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bestSolutionCount',
            type: 'uint256',
          },
        ],
        internalType: 'struct InquireType.User[]',
        name: 'usersList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'totalUsers',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalPages',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'questionIdCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'questions',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'asker',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'questionText',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'questionContent',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isClosed',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'chosenAnswerId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userAddresses',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'uint256',
        name: 'reputation',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'answerCount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'questionCount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'bestSolutionCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'voteFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
