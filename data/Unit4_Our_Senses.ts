import {
  Unit4Vocabulary1Data,
  Unit4SongData,
  SensesGrammar1,
  SensesVocabulary2,
  SensesGrammar2,
  SensesReading,
  SensesWriting,
  WorkbookCircleActivity,
  WorkbookListenWrite,
  WorkbookMatchActivity,
  WorkbookSongMatch,
  WorkbookSongWrite,
  WorkbookGrammar1,
  WorkbookGrammar1Match,
  WorkbookUnscrambleSentences,
  WorkbookReadWrite,
  WorkbookLookSmellTaste,
  WorkbookReadWriteSort,
  WorkbookGrammar2WasWere,
  WorkbookGrammar2LookMatch,
  WorkbookGrammar2RolePlay,
  WorkbookCrosswordPuzzle,
  WorkbookLookWrite,
  WorkbookListenReadFast,
  WorkbookReadingActivity,
  WorkbookReadingTrueFalse,
  WorkbookReadingCompleteChart,
  WorkbookReadWriteTurtle,
  WorkbookReadWriteWinter,
  WorkbookReadChoose,
  WorkbookReadWriteFromBox,
  WorkbookSenseVerbTable,
  SpinTabData
} from "./type";
const audioBase = "https://raw.githubusercontent.com/klamts/Unit4_Our_Senses/main";
const imageBase = "https://raw.githubusercontent.com/klamts/images/main";
export const unit4Vocabulary1DataTS: Unit4Vocabulary1Data ={
  "slug": "unit4-our-senses-vocabulary1",
  "unit": "Unit 4 - Our Senses",
  "sections": [
    {
      "section_name": "Listen and Read",
      "description": "Read",
      "words": [
    {
      "word": "eyes",
      "vi": "đôi mắt",
      "image": `${imageBase}/eyes.jpg`,
      "audio": `${audioBase}/eyes.wav`,
      "ipa": "/aɪz/"
    },
    {
      "word": "ears",
      "vi": "đôi tai",
      "image": `${imageBase}/ears.jpg`,
      "audio": `${audioBase}/ears.wav`,
      "ipa": "/ɪəz/"
    },
    {
      "word": "nose",
      "vi": "cái mũi",
      "image": `${imageBase}/nose.jpg`,
      "audio": `${audioBase}/nose.wav`,
      "ipa": "/nəʊz/"
    },
    {
      "word": "tongue",
      "vi": "cái lưỡi",
      "image": `${imageBase}/tongue.jpg`,
      "audio": `${audioBase}/tongue.wav`,
      "ipa": "/tʌŋ/"
    },
    {
      "word": "skin",
      "vi": "làn da",
      "image": `${imageBase}/skin.jpg`,
      "audio": `${audioBase}/skin.wav`,
      "ipa": "/skɪn/"
    },
    {
      "word": "smooth",
      "vi": "mịn màng",
      "image": `${imageBase}/smooth.jpg`,
      "audio": `${audioBase}/smooth.wav`,
      "ipa": "/smuːð/"
    },
    {
      "word": "rough",
      "vi": "thô ráp",
      "image": `${imageBase}/rough.jpg`,
      "audio": `${audioBase}/rough.wav`,
      "ipa": "/rʌf/"
    },
    {
      "word": "beautiful",
      "vi": "xinh đẹp",
      "image": `${imageBase}/beautiful.jpg`,
      "audio": `${audioBase}/beautiful.wav`,
      "ipa": "/ˈbjuː.tɪ.fəl/"
    },
    {
      "word": "ugly",
      "vi": "xấu xí",
      "image": `${imageBase}/ugly.jpg`,
      "audio": `${audioBase}/ugly.wav`,
      "ipa": "/ˈʌɡ.li/"
    },
    {
      "word": "hard",
      "vi": "cứng",
      "image": `${imageBase}/hard.jpg`,
      "audio": `${audioBase}/hard.wav`,
      "ipa": "/hɑːd/"
    },
    {
      "word": "soft",
      "vi": "mềm",
      "image": `${imageBase}/soft.jpg`,
      "audio": `${audioBase}/soft.wav`,
      "ipa": "/sɒft/"
    },
    {
      "word": "dry",
      "vi": "khô",
      "image": `${imageBase}/dry.jpg`,
      "audio": `${audioBase}/dry.wav`,
      "ipa": "/draɪ/"
    },
    {
      "word": "sticky",
      "vi": "dính",
      "image": `${imageBase}/sticky.jpg`,
      "audio": `${audioBase}/sticky.wav`,
      "ipa": "/ˈstɪk.i/"
    },
    {
      "word": "delicious",
      "vi": "ngon",
      "image": `${imageBase}/delicious.jpg`,
      "audio": `${audioBase}/delicious.wav`,
      "ipa": "/dɪˈlɪʃ.əs/"
    },
    {
      "word": "terrible",
      "vi": "kinh khủng",
      "image": `${imageBase}/terrible.jpg`,
      "audio": `${audioBase}/terrible.wav`,
      "ipa": "/ˈter.ə.bəl/"
    },
    {
      "word": "quiet",
      "vi": "yên tĩnh",
      "image": `${imageBase}/quiet.jpg`,
      "audio": `${audioBase}/quiet.wav`,
      "ipa": "/ˈkwaɪ.ət/"
    },
    {
      "word": "loud",
      "vi": "to, ồn ào",
      "image": `${imageBase}/loud.jpg`,
      "audio": `${audioBase}/loud.wav`,
      "ipa": "/laʊd/"
    }
  ]
    },
    {
      "section_name": "describe guess",
      "type": "Activity",
      "instruction": "Describe. Listen and guess. Work with a partner.",
      "items": [
      {
        "word": "a cake",
        "image": `${imageBase}/cake.jpg`,
        "audio": `${audioBase}/cake.wav`,
        "example": {
          "text": "It's sweet. It's soft. You can eat it on your birthday. What is it? A cake.",
          "audio": `${audioBase}/example_cake.wav`
        }
      },
      {
        "word": "an elephant",
        "image": `${imageBase}/elephant.jpg`,
        "audio": `${audioBase}/elephant.wav`,
        "example": {
          "text": "It's big. It's gray. It has a long trunk. What is it? An elephant.",
          "audio": `${audioBase}/example_elephant.wav`
        }
      },
      {
        "word": "a flower",
        "image": `${imageBase}/flower.jpg`,
        "audio": `${audioBase}/flower.wav`,
        "example": {
          "text": "It's beautiful. It's colorful. It grows in the garden. What is it? A flower.",
          "audio": `${audioBase}/example_flower.wav`
        }
      },
      {
        "word": "a leaf",
        "image": `${imageBase}/leaf.jpg`,
        "audio": `${audioBase}/leaf.wav`,
        "example": {
          "text": "It's green. It's thin. It grows on a tree. What is it? A leaf.",
          "audio": `${audioBase}/example_leaf.wav`
        }
      },
      {
        "word": "a rabbit",
        "image": `${imageBase}/rabbit.jpg`,
        "audio": `${audioBase}/rabbit.wav`,
        "example": {
          "text": "It's small. It's soft. It has big ears. What is it? A rabbit.",
          "audio": `${audioBase}/example_rabbit.wav`
        }
      },
      {
        "word": "a rock",
        "image": `${imageBase}/rock.jpg`,
        "audio": `${audioBase}/rock.wav`,
        "example": {
          "text": "It's hard. It's heavy. You can find it on the ground. What is it? A rock.",
          "audio": `${audioBase}/example_rock.wav`
        }
      },
      {
        "word": "a tomato",
        "image": `${imageBase}/tomato.jpg`,
        "audio": `${audioBase}/tomato.wav`,
        "example": {
          "text": "It's round. It's red. You can eat it in a salad. What is it? A tomato.",
          "audio": `${audioBase}/example_tomato.wav`
        }
      }
    ],
      "audio_instruction": "Listen to the examples before playing. Each audio reads the full cumulative sentence."
    }
  ]
}
export const unit4SongDataTS: Unit4SongData ={
  "song_name": "Our Senses",
  "unit": "Unit 4 - Our Senses",
  "audio":`${audioBase}/Song_Our_Senese.wav`,
  "type": "song",
  "lyrics": [
    "Our Senses ",
    "How does the cake taste?",
    "It tastes sweet.",
    "How does a kitten feel?",
    "It feels soft",
    "",
    "Let's count our senses, 1, 2, 3, 4, 5!",
    "Listen.",
    "Look.",
    "Feel.",
    "Taste.",
    "Smell.",
    "It's great to be alive!",
    "",
    "How does the drum sound?",
    "It sounds loud.",
    "How does a flower smell?",
    "It smells good.",
    "",
    "CHORUS",
    "",
    "How does the garden look?",
    "It looks beautiful.",
    "How does a hug feel?",
    "It feels great!"
  ]
}
export const unit4Grammar1DataTS: SensesGrammar1 ={
  "slug": "unit4-our-senses-grammar1",
  "unit": "Unit 4 - Our Senses",
  "grammar_name": "Sense verbs",
  "audioFolder": "/audio/unit4_our_senses/grammar1",
  "introduction": {
    "title": "GRAMMAR1",
    "audio": "GRAMMAR1.wav"
  },
  "items": [
    {
      "text": "Sense verbs",
      "audio": `${audioBase}/Sense verbs.wav`,
      "highlight": "Sense <b>verbs</b>",
      "translation": "Động từ chỉ giác quan"
    },
    {
      "text": "The soup smells great.",
      "audio": `${audioBase}/The soup smells great.wav`,
      "highlight": "The soup <b>smells</b> great.",
      "translation": "Súp có mùi rất ngon."
    },
    {
      "text": "The music sounds terrible.",
      "audio": `${audioBase}/The music sounds terrible.wav`,
      "highlight": "The music <b>sounds</b> terrible.",
      "translation": "Bản nhạc nghe rất tệ."
    },
    {
      "text": "The flowers look beautiful.",
      "audio": `${audioBase}/The flowers look beautiful.wav`,
      "highlight": "The flowers <b>look</b> beautiful.",
      "translation": "Những bông hoa trông rất đẹp."
    },
    {
      "text": "The baby rabbit feels soft.",
      "audio": `${audioBase}/The baby rabbit feels soft.wav`,
      "highlight": "The baby rabbit <b>feels</b> soft.",
      "translation": "Chú thỏ con sờ vào thì mềm mại."
    },
    {
      "text": "How does the chicken taste?",
      "audio": `${audioBase}/How does the chicken taste.wav`,
      "highlight": "How does the chicken <b>taste</b>?",
      "translation": "Thịt gà có vị thế nào?"
    },
    {
      "text": "It tastes delicious.",
      "audio": `${audioBase}/It tastes delicious.wav`,
      "highlight": "It <b>tastes</b> delicious.",
      "translation": "Nó có vị rất ngon."
    }
  ],
  "exercise": {
    "title": "Write. Use these words.",
    "words": [
      "good",
      "old",
      "rough",
      "smooth",
      "sticky",
      "terrible"
    ],
    "instruction": "Nhìn tranh gợi ý. Chọn sense verb phù hợp (tastes / looks / feels / sounds / smells) và điền tính từ trong khung.",
    "formula": "Sense verb + adjective",
    "note": "⚡ Lưu ý: Sau các sense verbs (look, sound, smell, taste, feel) ta dùng tính từ (adjective) để mô tả đặc điểm. KHÔNG dùng trạng từ (adverb).",
    "questions": [
      {
        "q": "The cake  ...",
        "answer": "good",
        "highlight": "The cake <b>tastes</b> <b>good</b>.",
        "explain": "Dùng 'tastes' + adjective để miêu tả hương vị. Ở đây 'good' = ngon.",
        "image": `${imageBase}/sense_verbs_cake.jpg`,
        "audio": `${audioBase}/The cake tastes good.wav`,
        "translation": "Cái bánh có vị ngon."
      },
      {
        "q": "The dog  ...",
        "answer": "terrible",
        "highlight": "The dog <b>smells</b> <b>terrible</b>.",
        "explain": "Dùng 'smells' + adjective để miêu tả mùi. Con chó trông dữ/tệ.",
        "image": `${imageBase}/sense_verbs_dog.jpg`,
        "audio": `${audioBase}/The dog smells terrible.wav`,
        "translation": "Con chó có mùi dữ/tệ."
      },
      {
        "q": "The house  ...",
        "answer": "old",
        "highlight": "The house <b>looks</b> <b>old</b>.",
        "explain": "Dùng 'looks' để miêu tả vẻ bề ngoài. Ngôi nhà trông cũ.",
        "image": `${imageBase}/sense_verbs_house.jpg`,
        "audio": `${audioBase}/The house looks old.wav`,
        "translation": "Ngôi nhà trông cũ."
      },
      {
        "q": "The glue  ...",
        "answer": "sticky",
        "highlight": "The glue <b>feels</b> <b>sticky</b>.",
        "explain": "Dùng 'feels' để miêu tả cảm giác khi chạm vào. Keo thì dính.",
        "image": `${imageBase}/sense_verbs_glue.jpg`,
        "audio": `${audioBase}/The glue feels sticky.wav`,
        "translation": "Keo thì dính."
      },
      {
        "q": "The rock  ...",
        "answer": "rough",
        "highlight": "The rock <b>feels</b> <b>rough</b>.",
        "explain": "Dùng 'feels' để miêu tả cảm giác sờ vào. Đá thì sần sùi.",
        "image": `${imageBase}/sense_verbs_rock.jpg`,
        "audio": `${audioBase}/The rock feels rough.wav`,
        "translation": "Đá thì sần sùi."
      },
      {
        "q": "The phone  ...",
        "answer": "smooth",
        "highlight": "The phone <b>feels</b> <b>smooth</b>.",
        "explain": "Dùng 'feels' + adjective để mô tả cảm giác chạm. Màn hình trơn mịn.",
        "image": `${imageBase}/sense_verbs_phone.jpg`,
        "audio": `${audioBase}/The phone feels smooth.wav`,
        "translation": "Màn hình trơn mịn."
      }
    ],
    "full_answers": [
      "The cake tastes good.",
      "The dog looks terrible.",
      "The house looks old.",
      "The glue feels sticky.",
      "The rock feels rough.",
      "The phone feels smooth."
    ]
  },
  "exercise2": {
    "title": "Write sentences. Look at the photo. Use sense words.",
    "instruction": "Nhìn ảnh (cảnh núi, hồ, cây xanh). Viết câu miêu tả bằng sense verbs (look, sound, feel, smell, taste).",
    "sample": {
      "text": "The trees are tall and green.",
      "audio": `${audioBase}/The trees are tall and green.wav`,
      "translation": "Những cái cây cao và xanh."
    },
    "image": `${imageBase}/sense_verbs_nature.jpg`,
    "suggested_answers": [
      {
        "text": "The lake looks blue and beautiful.",
        "audio": `${audioBase}/The lake looks blue and beautiful.wav`,
        "translation": "Cái hồ trông xanh và đẹp."
      },
      {
        "text": "The mountains look tall and rocky.",
        "audio": `${audioBase}/The mountains look tall and rocky.wav`,
        "translation": "Những ngọn núi trông cao và nhiều đá."
      },
      {
        "text": "The sky looks clear and sunny.",
        "audio": `${audioBase}/The sky looks clear and sunny.wav`,
        "translation": "Bầu trời trông trong xanh và có nắng."
      },
      {
        "text": "The clouds look white and soft.",
        "audio": `${audioBase}/The clouds look white and soft.wav`,
        "translation": "Những đám mây trông trắng và mềm mại."
      }
    ]
  },
  "exercise3": {
    "title": "Look around you. What do you see and hear? Write true sentences.",
    "instruction": "Viết câu thật về nơi bạn đang ở, dùng sense verbs.",
    "sample": {
      "text": "The classroom is quiet and sunny.",
      "audio": `${audioBase}/The classroom is quiet and sunny.wav`,
      "translation": "Lớp học yên tĩnh và đầy nắng."
    },
    "examples": [
      {
        "text": "The fans sound loud.",
        "audio": `${audioBase}/The fans sound loud.wav`,
        "translation": "Quạt nghe ồn ào."
      },
      {
        "text": "The lights look bright.",
        "audio": `${audioBase}/The lights look bright.wav`,
        "translation": "Đèn trông sáng."
      },
      {
        "text": "The chairs feel hard.",
        "audio": `${audioBase}/The chairs feel hard.wav`,
        "translation": "Ghế ngồi thì cứng."
      },
      {
        "text": "The window looks clean.",
        "audio": `${audioBase}/The window looks clean.wav`,
        "translation": "Cửa sổ trông sạch."
      }
    ]
  }
}
export const unit4Vocabulary2DataTS: SensesVocabulary2 ={
  "title": "Unit 4 - Our Senses (Vocabulary 2)",
  "slug": "unit4-our-senses-vocabulary2",
  "vocabulary": [
    {
      "word": "sweet",
      "vi": "ngọt",
      "image": `${imageBase}/sweet.jpg`,
      "audio": `${audioBase}/sweet.wav`,
      "example": {
        "text": "This honey is very sweet.",
        "audio": "This honey is very sweet.wav"
      },
      "ipa": "/swiːt/"
    },
    {
      "word": "salty",
      "vi": "mặn",
      "image": `${imageBase}/salty.jpg`,
      "audio": `${audioBase}/salty.wav`,
      "example": {
        "text": "The chips are salty.",
        "audio": "The chips are salty.wav"
      },
      "ipa": "/ˈsɒl.ti/"
    },
    {
      "word": "bitter",
      "vi": "đắng",
      "image": `${imageBase}/bitter.jpg`,
      "audio": `${audioBase}/bitter.wav`,
      "example": {
        "text": "Black coffee tastes bitter.",
        "audio": "Black coffee taste bitter.wav"
      },
      "ipa": "/ˈbɪt.ər/"
    },
    {
      "word": "sour",
      "vi": "chua",
      "image": `${imageBase}/sour.jpg`,
      "audio": `${audioBase}/sour.wav`,
      "example": {
        "text": "Lemons are sour.",
        "audio": "Lemons are sour.wav"
      },
      "ipa": "/saʊər/"
    },
    {
      "word": "spicy",
      "vi": "cay",
      "image": `${imageBase}/spicy.jpg`,
      "audio": `${audioBase}/spicy.wav`,
      "example": {
        "text": "These peppers are very spicy.",
        "audio": "These peppers are very spicy.wav"
      },
      "ipa": "/ˈspaɪ.si/"
    }
  ],
  "files": {
    "audio_folder": "D:\\english\\Unit4_Our_Senses\\Vocabulary2",
    "image_folder": "D:\\english\\images"
  },
  "created_at": {
    "$date": "2025-09-16T03:07:28.340Z"
  },
  "exercise1": {
    "title": "Listen and say. Read and write.",
    "instruction": "Nghe và lặp lại. Đọc và viết lại câu. Ôn 5 vị chính: sweet (ngọt), salty (mặn), sour (chua), spicy (cay), bitter (đắng).",
    "formula": "S + sense verb + adjective",
    "questions": [
      {
        "q": "This lemon isn’t ... . It’s ... .",
        "answer": [
          "sweet",
          "sour"
        ],
        "highlight": "This lemon isn’t <b>sweet</b>. It’s <b>sour</b>.",
        "vi": "Quả chanh này không ngọt. Nó chua.",
        "audio": `${audioBase}/This lemon isn’t sweet It’s sour.wav`
      },
      {
        "q": "I don’t like honey. I don’t like ... things.",
        "answer": [
          "sweet"
        ],
        "highlight": "I don’t like honey. I don’t like <b>sweet</b> things.",
        "vi": "Tôi không thích mật ong. Tôi không thích đồ ngọt.",
        "audio": `${audioBase}/I don’t like honey I don’t like sweet things.wav`
      },
      {
        "q": "These potato chips have a lot of salt. They’re very ... .",
        "answer": [
          "salty"
        ],
        "highlight": "These potato chips have a lot of salt. They’re very <b>salty</b>.",
        "vi": "Khoai tây chiên này có nhiều muối. Chúng rất mặn.",
        "audio": `${audioBase}/These potato chips have a lot of salt They’re very salty.wav`
      },
      {
        "q": "I like peppers. They’re really ... .",
        "answer": [
          "spicy"
        ],
        "highlight": "I like peppers. They’re really <b>spicy</b>.",
        "vi": "Tôi thích ớt. Chúng thật sự cay.",
        "audio": `${audioBase}/I like peppers They’re really spicy.wav`
      },
      {
        "q": "I don’t like the taste of coffee. It’s very ... .",
        "answer": [
          "bitter"
        ],
        "highlight": "I don’t like the taste of coffee. It’s very <b>bitter</b>.",
        "vi": "Tôi không thích vị cà phê. Nó rất đắng.",
        "audio": `${audioBase}/I don’t like the taste of coffee It’s very bitter.wav`
      }
    ],
    "full_answers": [
      "This lemon isn’t sweet. It’s sour.",
      "I don’t like honey. I don’t like sweet things.",
      "These potato chips have a lot of salt. They’re very salty.",
      "I like peppers. They’re really spicy.",
      "I don’t like the taste of coffee. It’s very bitter."
    ]
  },
  "exercise2": {
    "title": "Exercise 2: Listen and stick.",
    "instruction": "Nghe các đoạn hội thoại. Đánh số hoặc dán sticker vào đúng bức tranh.",
    "groups": [
      {
        "number": 1,
        "image": `${imageBase}/pepper.jpg`,
        "items": [
          {
            "text": "That is spicy.",
            "vi": "Cái đó cay.",
            "audio": `${audioBase}/That is spicy.wav`
          },
          {
            "text": "Don't eat it.",
            "vi": "Đừng ăn nó.",
            "audio": `${audioBase}/Don't eat it.wav`
          },
          {
            "text": "It's a pepper.",
            "vi": "Đó là một quả ớt.",
            "audio": `${audioBase}/It's a pepper.wav`
          }
        ]
      },
      {
        "number": 2,
        "image": `${imageBase}/lemonade.jpg`,
        "items": [
          {
            "text": "That's sour.",
            "vi": "Cái đó chua.",
            "audio": `${audioBase}/that's sour.wav`
          },
          {
            "text": "That's lemonade, I think.",
            "vi": "Tớ nghĩ đó là nước chanh.",
            "audio": `${audioBase}/That's lemonade, I think.wav`
          },
          {
            "text": "Yum. My favorite.",
            "vi": "Ngon quá. Món ưa thích của tớ.",
            "audio": `${audioBase}/Yum  My favorite.wav`
          }
        ]
      },
      {
        "number": 3,
        "image": `${imageBase}/icecream.jpg`,
        "items": [
          {
            "text": "That's very sweet.",
            "vi": "Cái đó rất ngọt.",
            "audio": `${audioBase}/That's very sweet.wav`
          },
          {
            "text": "It's strawberry ice cream.",
            "vi": "Đó là kem dâu.",
            "audio": `${audioBase}/It's strawberry ice cream.wav`
          }
        ]
      },
      {
        "number": 4,
        "image": `${imageBase}/chips.jpg`,
        "items": [
          {
            "text": "These are salty.",
            "vi": "Những cái này mặn.",
            "audio": `${audioBase}/These are salty.wav`
          },
          {
            "text": "They're potato chips.",
            "vi": "Đó là khoai tây chiên.",
            "audio": `${audioBase}/They're potato chips.wav`
          }
        ]
      },
      {
        "number": 5,
        "image": `${imageBase}/coffee.jpg`,
        "items": [
          {
            "text": "I know what that is.",
            "vi": "Tớ biết cái đó là gì.",
            "audio": `${audioBase}/I know what that is.wav`
          },
          {
            "text": "It's very bitter.",
            "vi": "Nó rất đắng.",
            "audio": `${audioBase}/It's very bitter.wav`
          },
          {
            "text": "It's black coffee.",
            "vi": "Đó là cà phê đen.",
            "audio": `${audioBase}/It's black coffee.wav`
          }
        ]
      }
    ]
  }
}
export const unit4Grammar2DataTS: SensesGrammar2 ={
  "title": "Unit 4 - Our Senses (Grammar 2)",
  "slug": "unit4-our-senses-grammar2",
  "grammar_name": "Past tense of 'be': was / were",
  "introduction": {
    "text": "Chúng ta dùng **was** và **were** để nói về thì quá khứ của động từ 'to be'.",
    "audio": "GRAMMAR2.wav",
    "image": "was_were_chart.jpg"
  },
  "items": [
    {
      "word": "was",
      "vi": "đã (số ít)",
      "audio": `${audioBase}/was.wav`,
      "image": `${imageBase}/icecream.jpg`,
      "example": {
        "text": "It was delicious.",
        "vi": "Nó đã ngon.",
        "audio": `${audioBase}/It was delicious, More, please.wav`,
        "image": `${imageBase}/end_icecream.jpg`
      }
    },
    {
      "word": "were",
      "vi": "đã (số nhiều)",
      "audio": `${audioBase}/were.wav`,
      "image": `${imageBase}/cookies.jpg`,
      "example": {
        "text": "They were great.",
        "vi": "Chúng thật tuyệt.",
        "audio": `${audioBase}/They were great.wav`,
        "image": `${imageBase}/cookies_great.jpg`
      }
    }
  ],
  "exercise1": {
    "title": "Exercise 1: Listen and repeat.",
    "instruction": "Nghe và lặp lại câu hỏi và câu trả lời.",
    "questions": [
      {
        "q": "How is the ice cream?",
        "vi": "Kem thế nào?",
        "audio": `${audioBase}/How is the ice cream_.wav`,
        "image": `${imageBase}/icecream.jpg`,
        "answer": {
          "text": "It's delicious.",
          "vi": "Nó ngon.",
          "audio": `${audioBase}/It's deliciours.wav`,
          "image": `${imageBase}/delicious_icecream.jpg`
        }
      },
      {
        "q": "How was the ice cream?",
        "vi": "Kem lúc nãy thế nào?",
        "audio": `${audioBase}/How was the ice cream.wav`,
        "image": `${imageBase}/icecream_past.jpg`,
        "answer": {
          "text": "It was delicious. More, please!",
          "vi": "Nó ngon. Cho tôi thêm nữa nhé!",
          "audio": `${audioBase}/It was delicious, More, please.wav`,
          "image": `${imageBase}/end_delicious_icecream.jpg`
        }
      },
      {
        "q": "How were the cookies?",
        "vi": "Những chiếc bánh quy lúc nãy thế nào?",
        "audio": `${audioBase}/How were the cookies.wav`,
        "image": `${imageBase}/cookies.jpg`,
        "answer": {
          "text": "They were great. Can I have one more, please?",
          "vi": "Chúng thật tuyệt. Cho tôi thêm một cái nữa được không?",
          "audio": `${audioBase}/Can i have one more, please.wav`,
          "image": `${imageBase}/cookies_great.jpg`
        }
      }
    ]
  },
  "files": {
    "audio_folder": "D:\\english\\Unit4_Our_Senses\\Grammar2",
    "image_folder": "D:\\english\\images"
  },
  "created_at": {
    "$date": "2025-09-16T04:58:18.092Z"
  },
  "exercise2": {
    "title": "Exercise 2: Read and write.",
    "instruction": "Đọc các câu sau và viết lại. Luyện tập với thì quá khứ của 'be'.",
    "questions": [
      {
        "text": "That ice cream was delicious. I want more, please!",
        "vi": "Que kem đó rất ngon. Tôi muốn ăn thêm, làm ơn!",
        "audio": `${audioBase}/That ice cream was delicious I want more, please!.wav`,
        "image": `${imageBase}/end_icecream.jpg`
      },
      {
        "text": "The music was loud. I'm going outside.",
        "vi": "Âm nhạc thật to. Tôi sẽ ra ngoài.",
        "audio": `${audioBase}/The music was loud I’m going outside.wav`,
        "image": `${imageBase}/music_loud.jpg`
      },
      {
        "text": "The flowers were beautiful before. They're ugly now.",
        "vi": "Những bông hoa trước đây rất đẹp. Giờ chúng xấu xí.",
        "audio": `${audioBase}/The flowers were beautiful before They’re ugly now.wav`,
        "image": `${imageBase}/flowers_before_after.jpg`
      },
      {
        "text": "That song was beautiful.",
        "vi": "Bài hát đó thật hay.",
        "audio": `${audioBase}/That song was beautiful.wav`,
        "image": `${imageBase}/song_beautiful.jpg`
      },
      {
        "text": "The glue was sticky, but now it's dry.",
        "vi": "Keo dính lúc trước, nhưng giờ đã khô.",
        "audio": `${audioBase}/The glue was sticky, but now it’s dry.wav`,
        "image": `${imageBase}/glue_sticky_dry.jpg`
      }
    ]
  },
  "exercise3": {
    "title": "Exercise 3: Play a game.",
    "instruction": "Cắt bánh xe ở cuối sách, quay và đặt câu. Chơi theo cặp.",
    "sample": {
      "text": "The flowers were beautiful, but now they aren't.",
      "vi": "Những bông hoa từng rất đẹp, nhưng giờ thì không.",
      "audio": `${audioBase}/The flowers were beautiful, but now they aren’t.wav`,
      "image": `${imageBase}/flowers_game.jpg`
    }
  }
}

export const unit4ReadingDataTS: SensesReading ={
  "title": "Unit 4 - Our Senses (Reading)",
  "slug": "unit4-our-senses-reading",
  "passage_name": "AMAZING Animal Senses",
  "files": {
    "audio_folder": "D:\\english\\Unit4_Our_Senses\\READING",
    "image_folder": "D:\\english\\images"
  },
  "content": [
    {
      "text": "AMAZING Animal Senses",
      "audio": `${audioBase}/AMAZING Animal Senses.wav`,
      "vi_meaning": "Những giác quan tuyệt vời của động vật",
      "image": `${imageBase}/amazing_animals.jpg`
    },
    {
      "text": "Many animals can see.",
      "audio": `${audioBase}/Many animals can see.wav`,
      "vi_meaning": "Nhiều loài động vật có thể nhìn.",
      "image": `${imageBase}/animals_see.jpg`
    },
    {
      "text": "hear",
      "audio": `${audioBase}/hear.wav`,
      "vi_meaning": "nghe",
      "image": `${imageBase}/animal_hear.jpg`
    },
    {
      "text": "smell",
      "audio": `${audioBase}/smell.wav`,
      "vi_meaning": "ngửi",
      "image": `${imageBase}/animal_smell.jpg`
    },
    {
      "text": "taste",
      "audio": `${audioBase}/taste.wav`,
      "vi_meaning": "nếm",
      "image": `${imageBase}/animal_taste.jpg`
    },
    {
      "text": "and touch",
      "audio": `${audioBase}/and touch.wav`,
      "vi_meaning": "và chạm",
      "image": `${imageBase}/animal_touch.jpg`
    },
    {
      "text": "but they do it in a different way from humans.",
      "audio":`${audioBase}/,but they do it in a different way from humans.wav`,
      "vi_meaning": "nhưng chúng làm điều đó theo cách khác với con người.",
      "image": `${imageBase}/different_from_humans.jpg`
    },
    {
      "text": "Imagine that you have to walk on your dinner to taste it.",
      "audio": `${audioBase}/Imagine that you have to walk on your dinner to taste it.wav`,
      "vi_meaning": "Hãy tưởng tượng bạn phải đi trên bữa ăn của mình để nếm nó.",
      "image": `${imageBase}/imagine.jpg`
    },
    {
      "text": "Well, a butterfly does.",
      "audio": `${audioBase}/Well, a butterfly does.wav`,
      "vi_meaning": "Thật vậy, bướm làm như thế.",
      "image": `${imageBase}/butterfly.jpg`
    },
    {
      "text": "It tastes with its feet.",
      "audio": `${audioBase}/It tastes with its feet.wav`,
      "vi_meaning": "Nó nếm bằng chân của mình.",
      "image": `${imageBase}/butterfly.jpg`
    },
    {
      "text": "People use the ends of their fingers to touch.",
      "audio": `${audioBase}/People use the ends of their fingers to touch.wav`,
      "vi_meaning": "Con người dùng đầu ngón tay để chạm.",
      "image": `${imageBase}/fingers_touch.jpg`
    },
    {
      "text": "Seals use their whiskers.",
      "audio": `${audioBase}/Seals use their whiskers.wav`,
      "vi_meaning": "Hải cẩu dùng ria mép của chúng.",
      "image": `${imageBase}/seal_whiskers.jpg`
    },
    {
      "text": "Their sense of touch is amazing.",
      "audio": `${audioBase}/Their sense of touch is amazing.wav`,
      "vi_meaning": "Khả năng xúc giác của chúng thật tuyệt vời.",
      "image": `${imageBase}/sense_touch.jpg`
    },
    {
      "text": "They can feel fish through the water 180 meters (590 ft) away.",
      "audio": `${audioBase}/They can feel fish through the water 180 meters (590 ft) away.wav`,
      "vi_meaning": "Chúng có thể cảm nhận được cá qua nước cách xa 180 mét.",
      "image": `${imageBase}/seal.jpg`
    },
    {
      "text": "Spiders don't have ears.",
      "audio": `${audioBase}/Spiders don't have ears.wav`,
      "vi_meaning": "Nhện không có tai.",
      "image": `${imageBase}/spider.jpg`
    },
    {
      "text": "They hear using hundreds of small hairs on their legs.",
      "audio": `${audioBase}/They hear using hundreds of small hairs on their legs.wav`,
      "vi_meaning": "Chúng nghe bằng hàng trăm sợi lông nhỏ trên chân.",
      "image": `${imageBase}/spider_hairs.jpg`
    },
    {
      "text": "We can smell delicious food in front of a restaurant.",
      "audio": `${audioBase}/We can smell delicious food in front of a restaurant.wav`,
      "vi_meaning": "Chúng ta có thể ngửi thấy mùi thức ăn thơm ngon trước một nhà hàng.",
      "image": `${imageBase}/restaurant_food.jpg`
    },  
    {
      "text": "But we can't smell food in a different town.",

      "audio": `${audioBase}/But we can't smell food in a different town.wav`,
      "vi_meaning": "Nhưng chúng ta không thể ngửi thấy thức ăn ở thị trấn khác.",
      "image": `${imageBase}/different_town.jpg`
    },
    {
      "text": "Bears can.",
      "audio": `${audioBase}/Bears can.wav`,
      "vi_meaning": "Nhưng gấu thì có thể.",
      "image": `${imageBase}/bear.jpg`
    },
    {
      "text": "Bears have a fantastic sense of smell.",
      "audio": `${audioBase}/Bears have a fantastic sense of smell.wav`,
      "vi_meaning": "Gấu có khứu giác tuyệt vời.",
      "image": `${imageBase}/bear_smell.jpg`
    },
    {
      "text": "They can smell things that are as far as 32 kilometers (20mi) away.",
      "audio": `${audioBase}/They can smell things that are as far as 32 kilometers (20mi) away.wav`,
      "vi_meaning": "Chúng có thể ngửi thấy những thứ cách xa tới 32 km.",
      "image": `${imageBase}/reading/bear_far_smell.jpg`
    },
    {
      "text": "Chameleons can see very well.",
      "audio": `${audioBase}/Chameleons can see very well.wav`,
      "vi_meaning": "Tắc kè hoa có thể nhìn rất tốt.",
      "image": `${imageBase}/chameleon.jpg`
    },
    {
      "text": "Look at their eyes.",
      "audio": `${audioBase}/Look at their eyes.wav`,
      "vi_meaning": "Hãy nhìn vào mắt của chúng.",
      "image": `${imageBase}/chameleon_eyes.jpg`
    },
    {
      "text": "One eye looks up, and the other eye looks down.",
      "audio": `${audioBase}/One eye looks up, and the other eye looks down.wav`,
      "vi_meaning": "Một mắt nhìn lên, và mắt kia nhìn xuống.",
      "image": `${imageBase}/reading/chameleon_eyes_direction.jpg`
    },
    {
      "text": "They can see all around them.",
      "audio": `${audioBase}/They can see all around them.wav`,
      "vi_meaning": "Chúng có thể nhìn xung quanh mình.",
      "image": `${imageBase}/chameleon_all_around.jpg`
    }
  ],
  "created_at": {
    "$date": "2025-09-16T07:10:07.742Z"
  },
  "vocabulary": [
    {
      "word": "amazing",
      "ipa": "/əˈmeɪ.zɪŋ/",
      "vi_meaning": "tuyệt vời, kỳ diệu",
      "audio": `${audioBase}/amazing.wav`,
      "image": `${imageBase}/amazing.jpg`
    },
    {
      "word": "imagine",
      "ipa": "/ɪˈmædʒ.ɪn/",
      "vi_meaning": "tưởng tượng",
      "audio": `${audioBase}/imagine.wav`,
      "image": `${imageBase}/imagine_vocabulary.jpg`
    },
    {
      "word": "walk on",
      "ipa": "/wɔːk ɒn/",
      "vi_meaning": "bước lên, đi trên",
      "audio": `${audioBase}/walk on.wav`,
      "image": `${imageBase}/walk_on.jpg`
    },
    {
      "word": "butterfly",
      "ipa": "/ˈbʌt̬.ɚ.flaɪ/",
      "vi_meaning": "con bướm",
      "audio": `${audioBase}/butterfly.wav`,
      "image": `${imageBase}/butterfly.jpg`
    },
    {
      "word": "seals",
      "ipa": "/siːlz/",
      "vi_meaning": "hải cẩu",
      "audio": `${audioBase}/seals.wav`,
      "image": `${imageBase}/seal.jpg`
    },
    {
      "word": "whiskers",
      "ipa": "/ˈwɪs.kɚz/",
      "vi_meaning": "ria mép (của động vật)",
      "audio": `${audioBase}/whiskers.wav`,
      "image": `${imageBase}/whiskers.jpg`
    },
    {
      "word": "through the water",
      "ipa": "/θruː ðə ˈwɔː.tər/",
      "vi_meaning": "xuyên qua nước",
      "audio": `${audioBase}/through the water.wav`,
      "image": `${imageBase}/through_water.jpg`
    },
    {
      "word": "fantastic",
      "ipa": "/fænˈtæs.tɪk/",
      "vi_meaning": "tuyệt vời",
      "audio": `${audioBase}/fantastic.wav`,
      "image": `${imageBase}/fantastic.jpg`
    },
    {
      "word": "sense of touch",
      "ipa": "/sens əv tʌtʃ/",
      "vi_meaning": "giác quan xúc giác",
      "audio": `${audioBase}/sense of touch.wav`,
      "image": `${imageBase}/sense_touch.jpg`
    },
    {
      "word": "sense of smell",
      "ipa": "/sens əv smel/",
      "vi_meaning": "giác quan khứu giác",
      "audio": `${audioBase}/sense of smell.wav`,
      "image": `${imageBase}/sense_smell.jpg`
    },
    {
      "word": "as far as",
      "ipa": "/æz fɑːr æz/",
      "vi_meaning": "xa tới, cho tới",
      "audio": `${audioBase}/as far as.wav`,
      "image": `${imageBase}/as_far_as.jpg`
    },
    {
      "word": "chameleons",
      "ipa": "/kəˈmiː.li.ənz/",
      "vi_meaning": "tắc kè hoa",
      "audio": `${audioBase}/chameleons.wav`,
      "image": `${imageBase}/chameleon.jpg`
    },
    {
      "word": "look at",
      "ipa": "/lʊk æt/",
      "vi_meaning": "nhìn vào",
      "audio": `${audioBase}/look at.wav`,
      "image": `${imageBase}/look_at.jpg`
    },
    {
      "word": "look up",
      "ipa": "/lʊk ʌp/",
      "vi_meaning": "nhìn lên",
      "audio": `${audioBase}/look up.wav`,
      "image": `${imageBase}/look_up.jpg`
    },
    {
      "word": "look down",
      "ipa": "/lʊk daʊn/",
      "vi_meaning": "nhìn xuống",
      "audio": `${audioBase}/look down.wav`,
      "image": `${imageBase}/look_down.jpg`
    },
    {
      "word": "can see all around",
      "ipa": "/kæn siː ɔːl əˈraʊnd/",
      "vi_meaning": "có thể nhìn thấy xung quanh",
      "audio": `${audioBase}/can see all around.wav`,
      "image": `${imageBase}/look_around.jpg`
    }
  ],
  "exercises": [
    {
      "type": "true_false",
      "title": "Read. Check T for True and F for False.",
      "questions": [
        {
          "text": "Spiders have ears.",
          "answer": "F"
        },
        {
          "text": "Bears can't smell very well.",
          "answer": "F"
        },
        {
          "text": "Butterflies taste with their feet.",
          "answer": "T"
        },
        {
          "text": "Seals use their whiskers to feel fish in the water.",
          "answer": "T"
        },
        {
          "text": "Chameleons can look up and down at the same time.",
          "answer": "T"
        }
      ]
    },
    {
      "type": "table_fill",
      "title": "Read the text again. Write.",
      "columns": [
        "Animal",
        "Sense",
        "Why is it unusual?"
      ],
      "rows": [
        {
          "Animal": "Butterfly",
          "Sense": "taste",
          "Why": "It uses its feet."
        },
        {
          "Animal": "Seals",
          "Sense": "touch",
          "Why": "They use their whiskers to feel fish."
        },
        {
          "Animal": "Spiders",
          "Sense": "hearing",
          "Why": "They hear using small hairs on their legs."
        },
        {
          "Animal": "Bears",
          "Sense": "smell",
          "Why": "They can smell things 32 km away."
        },
        {
          "Animal": "Chameleons",
          "Sense": "sight",
          "Why": "Each eye looks in a different direction."
        },
        {
          "Animal": "Humans",
          "Sense": "taste/touch",
          "Why": "We use tongues and fingers."
        }
      ]
    },
    {
      "type": "speaking",
      "title": "Talk about other animals you know. Work with a partner.",
      "prompts": [
        "I think dogs can hear very well.",
        "I think bats can't see very well."
      ]
    }
  ]
}
export const unit4WritingDataTS: SensesWriting =
{
  "title": "Unit 4 - Our Senses (Writing)",
  "slug": "unit4-our-senses-writing",
  "writing_name": "Using and / but / or",
  "files": {
    "audio_folder": "D:\\english\\Unit4_Our_Senses\\WRITING",
    "image_folder": "D:\\english\\images"
  },
  "introduction": {
    "text": "We use the word and to show that two connected ideas are similar. We use but to show that two connected ideas are different. When we can choose between two connected ideas, we use or.",
    "vi_meaning": "Chúng ta dùng từ and để chỉ hai ý tưởng tương đồng. Dùng but để chỉ hai ý tưởng trái ngược. Khi có thể chọn giữa hai ý, ta dùng or.",
    "image": `${imageBase}/and_but_or.jpg`,
    "audio": `${audioBase}/and_but_or_intro.wav`
  },
  "passage": {
    "text": "Summer is my favorite season. The weather is hot, and we do many activities outside. On weekends we visit our grandparents, or we go to the river with my cousin. At my grandmother's house, we sit outside and play cards, or we play with their pet dog, Charlie. My grandma loves flowers. They look beautiful, and they smell great, too. There's a river near my cousin's house, and we swim there sometimes. The water's cold, but I love it! After we swim, we eat fruit or ice cream, but strawberry is my favorite!",
    "audio": `${audioBase}/writing_passage.wav`,
    "image": `${imageBase}/summer.jpg`
  },
  "exercises": [
    {
      "type": "underline",
      "instruction": "Underline the sentences with or.",
      "vi_instruction": "Gạch dưới những câu có từ 'or'.",
      "sentences": [
        {
          "text": "On weekends we visit our grandparents, or we go to the river with my cousin.",
          "audio": `${audioBase}/sentence1.wav`
        },
        {
          "text": "At my grandmother's house, we sit outside and play cards, or we play with their pet dog, Charlie.",
          "audio": `${audioBase}/sentence2.wav`
        },
        {
          "text": "After we swim, we eat fruit or ice cream, but strawberry is my favorite!",
          "audio": `${audioBase}/sentence3.wav`
        }
      ]
    }
  ],
  "created_at": {
    "$date": "2025-09-16T08:38:06.619Z"
  }
}
export const unit4GWorkbookCircleActivityDataTS: WorkbookCircleActivity ={
  "slug": "unit4-our-senses-vocabulary1-workbook",
  "unit": "Unit 4",
  "section": "Vocabulary1",
  "title": "Look at the photos. Circle the hard toys.",
  "type": "circle_activity",
  "instruction": "Look at the photos. Circle the hard toys.",
  "items": [
    {
      "id": 1,
      "word": "teddy bear",
      "type": "soft toy",
      "image": `${imageBase}/teddy_bear.jpg`,
      "isAnswer": false
    },
    {
      "id": 2,
      "word": "bicycle",
      "type": "hard toy",
      "image": `${imageBase}/bicycle.jpg`,
      "isAnswer": true
    },
    {
      "id": 3,
      "word": "truck",
      "type": "hard toy",
      "image": `${imageBase}/truck.jpg`,
      "isAnswer": true
    }
  ],
  "files": {
    "imageFolder": "/images/unit4_our_senses/workbook/vocabulary1"
  }
}
export const unit4GWorkbookListenWriteActivityDataTS: WorkbookListenWrite ={
  "slug": "unit4-our-senses-vocabulary1-listenwrite",
  "unit": "Unit 4",
  "section": "Vocabulary1",
  "title": "Listen and write",
  "type": "listen_write",
  "instruction": "Listen to the sentences and write the missing word.",
  "words": [
    "beautiful",
    "delicious",
    "dry",
    "hard",
    "loud",
    "quiet",
    "rough",
    "smooth",
    "soft",
    "sticky",
    "terrible",
    "ugly"
  ],
  "sentences": [
    {
      "text": "This hat is ___",
      "full_sentence": "This hat is hard.",
      "audio": `${audioBase}/This hat is hard.wav`,
      "answer": "hard",
      "image": `${imageBase}/hat_hard.jpg`,
      "vietnamese": "Chiếc mũ này thì cứng."
    },
    {
      "text": "This hat is ___",
      "full_sentence": "This hat is soft.",
      "audio": `${audioBase}/This hat is soft.wav`,
      "answer": "soft",
      "image": `${imageBase}/hat_soft.jpg`,
      "vietnamese": "Chiếc mũ này thì mềm."
    },
    {
      "text": "My hands are ___",
      "full_sentence": "My hands are sticky.",
      "audio": `${audioBase}/My hands are stick.wav`,
      "answer": "sticky",
      "image": `${imageBase}/hands_sticky.jpg`,
      "vietnamese": "Tay tôi thì dính."
    },
    {
      "text": "My hands are ___",
      "full_sentence": "My hands are dry.",
      "audio": `${audioBase}/mMy hands are dry.wav`,
      "answer": "dry",
      "image": `${imageBase}/hands_dry.jpg`,
      "vietnamese": "Tay tôi thì khô."
    },
    {
      "text": "This rock is ___",
      "full_sentence": "This rock is smooth.",
      "audio": `${audioBase}/This rock is smooth.wav`,
      "answer": "smooth",
      "image": `${imageBase}/rock_smooth.jpg`,
      "vietnamese": "Hòn đá này thì nhẵn."
    },
    {
      "text": "This rock is ___",
      "full_sentence": "This rock is rough.",
      "audio": `${audioBase}/This rock is rough.wav`,
      "answer": "rough",
      "image": `${imageBase}/rock_rough.jpg`,
      "vietnamese": "Hòn đá này thì sần sùi."
    },
    {
      "text": "This apple is ___",
      "full_sentence": "This apple is delicious.",
      "audio": `${audioBase}/This apple is delicious.wav`,
      "answer": "delicious",
      "image": `${imageBase}/apple_delicious.jpg`,
      "vietnamese": "Quả táo này thì ngon."
    },
    {
      "text": "This apple is ___",
      "full_sentence": "This apple is terrible.",
      "audio": `${audioBase}/This apple is terrible.wav`,
      "answer": "terrible",
      "image": `${imageBase}/apple_terrible.jpg`,
      "vietnamese": "Quả táo này thì dở."
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/workbook/vocabulary1",
    "imageFolder": "/images/unit4_our_senses/workbook/vocabulary1"
  }
}
export const unit4GWorkbookmatchActivityActivityDataTS: WorkbookMatchActivity ={
  "slug": "unit4-our-senses-vocabulary1-match",
  "unit": "Unit 4",
  "section": "Vocabulary1",
  "title": "Look at the pictures. Read the sentences in Activity 2. Match. Write the number.",
  "type": "match_activity",
  "instruction": "Look at the pictures. Read the sentences in Activity 2. Match. Write the number.",
  "items": [
    {
      "id": 1,
      "image": `${imageBase}/hat_hard.jpg`,
      "correctSentence": "This hat is hard.",
      "vietnamese": "Chiếc mũ này thì cứng."
    },
    {
      "id": 2,
      "image": `${imageBase}/hat_soft.jpg`,
      "correctSentence": "This hat is soft.",
      "vietnamese": "Chiếc mũ này thì mềm."
    },
    {
      "id": 3,
      "image": `${imageBase}/hands_sticky.jpg`,
      "correctSentence": "My hands are sticky.",
      "vietnamese": "Tay tôi thì dính."
    },
    {
      "id": 4,
      "image": `${imageBase}/hands_dry.jpg`,
      "correctSentence": "My hands are dry.",
      "vietnamese": "Tay tôi thì khô."
    },
    {
      "id": 5,
      "image": `${imageBase}/rock_smooth.jpg`,
      "correctSentence": "This rock is smooth.",
      "vietnamese": "Hòn đá này thì nhẵn."
    },
    {
      "id": 6,
      "image": `${imageBase}/rock_rough.jpg`,
      "correctSentence": "This rock is rough.",
      "vietnamese": "Hòn đá này thì sần sùi."
    },
    {
      "id": 7,
      "image": `${imageBase}/apple_delicious.jpg`,
      "correctSentence": "This apple is delicious.",
      "vietnamese": "Quả táo này thì ngon."
    },
    {
      "id": 8,
      "image": `${imageBase}/apple_terrible.jpg`,
      "correctSentence": "This apple is terrible.",
      "vietnamese": "Quả táo này thì dở."
    }
  ],
  "files": {
    "imageFolder": "/images/unit4_our_senses/workbook/vocabulary1"
  }
}
export const unit4GWorkbooksongMatchActivityDataTS: WorkbookSongMatch ={
  "slug": "unit4-our-senses-song-match",
  "unit": "Unit 4",
  "section": "Song",
  "title": "Listen to the song. Draw lines to match.",
  "type": "song_match_activity",
  "instruction": "Listen to the song. Draw lines to match the questions with the answers.",
  "audio": `${audioBase}/our_senses_song.wav`,
  "items": [
    {
      "id": 1,
      "question": "How does the cake taste?",
      "answer": "It tastes sweet.",
      "vietnamese": {
        "question": "Cái bánh có vị thế nào?",
        "answer": "Nó có vị ngọt."
      },
      "answerAudio": `${audioBase}/a1.wav`,
      "questionAudio": `${audioBase}/q1.wav`
    },
    {
      "id": 2,
      "question": "How does a kitten feel?",
      "answer": "It feels soft.",
      "vietnamese": {
        "question": "Con mèo con cảm thấy thế nào?",
        "answer": "Nó mềm."
      },
      "answerAudio": `${audioBase}/a2.wav`,
      "questionAudio": `${audioBase}/q2.wav`
    },
    {
      "id": 3,
      "question": "How does the garden look?",
      "answer": "It looks beautiful.",
      "vietnamese": {
        "question": "Khu vườn trông thế nào?",
        "answer": "Nó trông đẹp."
      },
      "answerAudio": `${audioBase}/a3.wav`,
      "questionAudio": `${audioBase}/q3.wav`
    },
    {
      "id": 4,
      "question": "How does a hug feel?",
      "answer": "It feels great!",
      "vietnamese": {
        "question": "Cái ôm cảm thấy thế nào?",
        "answer": "Nó thật tuyệt."
      },
      "answerAudio": `${audioBase}/a4.wav`,
      "questionAudio": `${audioBase}/q4.wav`
    },
    {
      "id": 5,
      "question": "How does the drum sound?",
      "answer": "It sounds loud.",
      "vietnamese": {
        "question": "Tiếng trống nghe thế nào?",
        "answer": "Nó kêu to."
      },
      "answerAudio": `${audioBase}/a5.wav`,
      "questionAudio": `${audioBase}/q5.wav`
    },
    {
      "id": 6,
      "question": "How does a flower smell?",
      "answer": "It smells good.",
      "vietnamese": {
        "question": "Bông hoa có mùi thế nào?",
        "answer": "Nó thơm."
      },
      "answerAudio": `${audioBase}/a6.wav`,
      "questionAudio": `${audioBase}/q6.wav`
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/song"
  }
}
export const unit4GWorkbookSongWriteActivityDataTS: WorkbookSongWrite ={
  "slug": "unit4-our-senses-song-write",
  "unit": "Unit 4",
  "section": "Song",
  "title": "Write a new verse for the song.",
  "type": "song_write_activity",
  "instruction": "Use the pictures and words to write a new verse for the song.",
  "words": [
    {
      "word": "banana",
      "image": `${imageBase}/banana.jpg`,
      "vietnamese": "quả chuối"
    },
    {
      "word": "rabbit",
      "image": `${imageBase}/rabbit.jpg`,
      "vietnamese": "con thỏ"
    },
    {
      "word": "turtle",
      "image": `${imageBase}/turtle.jpg`,
      "vietnamese": "con rùa"
    },
    {
      "word": "hot air balloon",
      "image": `${imageBase}/hot air balloon.jpg`,
      "vietnamese": "khinh khí cầu"
    },
    {
      "word": "motorcycle",
      "image": `${imageBase}/motorcycle.jpg`,
      "vietnamese": "xe máy"
    },
    {
      "word": "subway",
      "image": `${imageBase}/subway.jpg`,
      "vietnamese": "tàu điện ngầm"
    }
  ],
  "adjectives": [
    {
      "word": "dry",
      "vietnamese": "khô"
    },
    {
      "word": "loud",
      "vietnamese": "to"
    },
    {
      "word": "rough",
      "vietnamese": "sần sùi"
    },
    {
      "word": "sticky",
      "vietnamese": "dính"
    },
    {
      "word": "hard",
      "vietnamese": "cứng"
    },
    {
      "word": "quiet",
      "vietnamese": "yên tĩnh"
    },
    {
      "word": "smooth",
      "vietnamese": "nhẵn"
    },
    {
      "word": "terrible",
      "vietnamese": "dở/tệ"
    }
  ],
  "sentencePatterns": [
    {
      "question": "How does a ........... feel?",
      "answer": "It feels ..............................."
    },
    {
      "question": "How does a ........... sound?",
      "answer": "It sounds ....................."
    }
  ],
  "files": {
    "imageFolder": "/images/unit4_our_senses/song"
  }
}
export const unit4GWorkbookGrammar1ActivityDataTS: WorkbookGrammar1 ={
  "slug": "unit4-our-senses-grammar1",
  "unit": "Unit 4",
  "section": "Grammar1",
  "title": "Sense verbs",
  "type": "grammar_activity",
  "instruction": "Read the tables. Practice the sentences and questions with sense verbs.",
  "tables": {
    "examples": {
      "columns": [
        "Subject",
        "Verb",
        "Complement"
      ],
      "rows": [
        {
          "subject": "The pizza",
          "verb": "smells",
          "complement": "great.",
          "audio": `${audioBase}/the_pizza_smells_great.wav`
        },
        {
          "subject": "The dress",
          "verb": "looks",
          "complement": "beautiful.",
          "audio": `${audioBase}/the_dress_looks_beautiful.wav`
        },
        {
          "subject": "The helicopter",
          "verb": "sounds",
          "complement": "loud.",
          "audio": `${audioBase}/the_helicopter_sounds_loud.wav`
        },
        {
          "subject": "The cat",
          "verb": "feels",
          "complement": "soft.",
          "audio": `${audioBase}/the_cat_feels_soft.wav`
        }
      ]
    },
    "questions": {
      "columns": [
        "Wh-word",
        "Auxiliary",
        "Subject",
        "Verb"
      ],
      "rows": [
        {
          "wh": "How",
          "aux": "does",
          "subject": "the apple",
          "verb": "taste?",
          "audio": `${audioBase}/how_does_the_apple_taste.wav`
        },
        {
          "wh": "How",
          "aux": "do",
          "subject": "the tables",
          "verb": "feel?",
          "audio": `${audioBase}/how_do_the_tables_feel.wav`
        }
      ]
    },
    "answers": {
      "columns": [
        "Subject",
        "Verb",
        "Complement"
      ],
      "rows": [
        {
          "subject": "It",
          "verb": "tastes",
          "complement": "delicious.",
          "audio": `${audioBase}/it_tastes_delicious.wav`
        },
        {
          "subject": "They",
          "verb": "feel",
          "complement": "hard.",
          "audio": `${audioBase}/they_feel_hard.wav`
        }
      ]
    }
  }
}
export const unit4GWorkbookGrammar1MatchActivityDataTS: WorkbookGrammar1Match ={
  "slug": "unit4-our-senses-grammar1-look-match",
  "unit": "Unit 4",
  "section": "Grammar1",
  "title": "Look. Read and match. Write the letter.",
  "type": "match_activity",
  "instruction": "Look at the pictures labeled a–f. Read the sentences. Match each sentence with the correct picture by writing the letter.",
  "items": [
    {
      "id": 1,
      "sentence": "This looks beautiful.",
      "answer": "a",
      "imageLabel": "a",
      "imageSrc": `${imageBase}/a.jpg`,
      "audio": `${audioBase}/This looks beautiful.wav`
    },
    {
      "id": 2,
      "sentence": "This smells terrible.",
      "answer": "b",
      "imageLabel": "b",
      "imageSrc": `${imageBase}/b.jpg`,
      "audio": `${audioBase}/This smells terrible.wav`
    },
    {
      "id": 3,
      "sentence": "This feels sticky.",
      "answer": "c",
      "imageLabel": "c",
      "imageSrc": `${imageBase}/c.jpg`,
      "audio": `${audioBase}/This feels sticky.wav`
    },
    {
      "id": 4,
      "sentence": "This feels dry.",
      "answer": "d",
      "imageLabel": "d",
      "imageSrc": `${imageBase}/d.jpg`,
      "audio": `${audioBase}/This feels dry.wav`
    },
    {
      "id": 5,
      "sentence": "This tastes terrible.",
      "answer": "e",
      "imageLabel": "e",
      "imageSrc": `${imageBase}/e.jpg`,
      "audio": `${audioBase}/This tastes terrible.wav`
    },
    {
      "id": 6,
      "sentence": "This tastes delicious.",
      "answer": "f",
      "imageLabel": "f",
      "imageSrc": `${imageBase}/f.jpg`,
      "audio": `${audioBase}/This tastes delicious.wav`
    }
  ],
  "files": {
    "imageFolder": "/images",
    "audioFolder": "/audio/unit4_our_senses/workbook/"
  }
}
export const unit4WorkbookUnscrambleSentencesActivityDataTS: WorkbookUnscrambleSentences ={
  "slug": "unit4-our-senses-unscramble-sentences",
  "unit": "Unit 4",
  "section": "Grammar1",
  "title": "Unscramble the sentences. Write. Listen to check your answers",
  "type": "unscramble_sentences",
  "instruction": "Unscramble the words to make correct sentences. Listen to check your answers.",
  "sentences": [
    {
      "id": 1,
      "words": [
        "feels",
        "The",
        "hot",
        "sun"
      ],
      "answer": "The sun feels hot",
      "meaning": "Mặt trời cảm thấy nóng",
      "audio": `${audioBase}/the_sun_feels_hot.wav`,
      "imageSrc": `${imageBase}/the_sun.jpg`
    },
    {
      "id": 2,
      "words": [
        "old",
        "look",
        "books",
        "The"
      ],
      "answer": "The books look old",
      "meaning": "Những cuốn sách trông cũ",
      "audio": `${audioBase}/the_books_look_old.wav`,
      "imageSrc": `${imageBase}/the_books.jpg`
    },
    {
      "id": 3,
      "words": [
        "do",
        "the",
        "sandwiches",
        "taste?",
        "How"
      ],
      "answer": "How do the sandwiches taste?",
      "meaning": "Bánh sandwich có vị như thế nào?",
      "audio": `${audioBase}/how_do_the_sandwiches_taste.wav`,
      "imageSrc": `${imageBase}/the_sandwiches.jpg`
    },
    {
      "id": 4,
      "words": [
        "How",
        "sound?",
        "does",
        "the",
        "drum"
      ],
      "answer": "How does the drum sound?",
      "meaning": "Trống nghe như thế nào?",
      "audio": `${audioBase}/how_does_the_drum_sound.wav`,
      "imageSrc": `${imageBase}/the_drum.jpg`
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/WB_Vocabulary1",
    "imageFolder": "/images"
  }
}
export const unit4WorkbookReadWriteActivityDataTS: WorkbookReadWrite ={
  "slug": "unit4-our-senses-read-write",
  "unit": "Unit 4",
  "section": "Grammar1",
  "title": "Read and Write. Listen to check your answers",
  "type": "read_write",
  "instruction": "Complete the sentences with the correct words. Listen to check your answers.",
  "sentences": [
    {
      "id": 1,
      "question": "How does the bread taste? It ___ good.",
      "answer": "tastes",
      "questionAudio": `${audioBase}/how_does_the_bread_taste_question.wav`,
      "answerAudio": `${audioBase}/how_does_the_bread_taste_answer.wav`,
      "imageSrc": `${imageBase}/bread.jpg`
    },
    {
      "id": 2,
      "question": "How ___ the sock smell? It smells terrible!",
      "answer": "does",
      "questionAudio": `${audioBase}/how_does_the_sock_smell_question.wav`,
      "answerAudio": `${audioBase}/how_does_the_sock_smell_answer.wav`,
      "imageSrc": `${imageBase}/sock.jpg`
    },
    {
      "id": 3,
      "question": "How do the rocks feel? They ___ hard.",
      "answer": "feel",
      "questionAudio": `${audioBase}/how_do_the_rocks_feel_question.wav`,
      "answerAudio": `${audioBase}/how_do_the_rocks_feel_answer.wav`,
      "imageSrc": `${imageBase}/rocks.jpg`
    },
    {
      "id": 4,
      "question": "How ___ the old cars look? They look ugly.",
      "answer": "do",
      "questionAudio": `${audioBase}/how_do_the_old_cars_look_question.wav`,
      "answerAudio": `${audioBase}/how_do_the_old_cars_look_answer.wav`,
      "imageSrc": `${imageBase}/old_cars.jpg`
    },
    {
      "id": 5,
      "question": "How ___ the parrot sound? It sounds loud.",
      "answer": "does",
      "questionAudio": `${audioBase}/how_does_the_parrot_sound_question.wav`,
      "answerAudio": `${audioBase}/how_does_the_parrot_sound_answer.wav`,
      "imageSrc": `${imageBase}/parrot.jpg`
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/WB_Vocabulary1",
    "imageFolder": "/images/"
  }
}
export const unit4WorkbookLookSmellTasteActivityDataTS: WorkbookLookSmellTaste ={
  "slug": "unit4-our-senses-look-smell-taste",
  "unit": "Unit 4",
  "section": "Vocabulary1",
  "title": "Look, Smell, Taste – Describe the Food",
  "type": "fill_in_adjective",
  "instruction": "Complete the sentences with the correct adjective. Listen to check your answers.",
  "adjectives": {
    "look": [
      {
        "adj": "delicious",
        "meaning": "ngon mắt",
        "audio": `${audioBase}/delicious.wav`
      },
      {
        "adj": "beautiful",
        "meaning": "đẹp",
        "audio": `${audioBase}/beautiful.wav`
      },
      {
        "adj": "colorful",
        "meaning": "nhiều màu sắc",
        "audio": `${audioBase}/colorful.wav`
      },
      {
        "adj": "fresh",
        "meaning": "tươi",
        "audio": `${audioBase}/fresh.wav`
      },
      {
        "adj": "appetizing",
        "meaning": "kích thích vị giác",
        "audio": `${audioBase}/appetizing.wav`
      },
      {
        "adj": "golden",
        "meaning": "vàng ươm",
        "audio": `${audioBase}/golden.wav`
      },
      {
        "adj": "burnt",
        "meaning": "cháy xém",
        "audio": `${audioBase}/burnt.wav`
      },
      {
        "adj": "plain",
        "meaning": "đơn giản",
        "audio": `${audioBase}/plain.wav`
      }
    ],
    "smell": [
      {
        "adj": "amazing",
        "meaning": "tuyệt vời",
        "audio": `${audioBase}/amazing.wav`
      },
      {
        "adj": "fragrant",
        "meaning": "thơm",
        "audio": `${audioBase}/fragrant.wav`
      },
      {
        "adj": "sweet",
        "meaning": "ngọt",
        "audio": `${audioBase}/sweet.wav`
      },
      {
        "adj": "spicy",
        "meaning": "cay",
        "audio": `${audioBase}/spicy.wav`
      },
      {
        "adj": "fresh",
        "meaning": "tươi",
        "audio": `${audioBase}/fresh_smell.wav`
      },
      {
        "adj": "strong",
        "meaning": "nồng",
        "audio": `${audioBase}/strong.wav`
      },
      {
        "adj": "burnt",
        "meaning": "khét",
        "audio": `${audioBase}/burnt_smell.wav`
      },
      {
        "adj": "sour",
        "meaning": "chua",
        "audio": `${audioBase}/sour.wav`
      }
    ],
    "taste": [
      {
        "adj": "delicious",
        "meaning": "ngon",
        "audio": `${audioBase}/delicious_taste.wav`
      },
      {
        "adj": "sweet",
        "meaning": "ngọt",
        "audio": `${audioBase}/sweet_taste.wav`
      },
      {
        "adj": "sour",
        "meaning": "chua",
        "audio": `${audioBase}/sour_taste.wav`
      },
      {
        "adj": "bitter",
        "meaning": "đắng",
        "audio": `${audioBase}/bitter.wav`
      },
      {
        "adj": "salty",
        "meaning": "mặn",
        "audio": `${audioBase}/salty.wav`
      },
      {
        "adj": "spicy",
        "meaning": "cay",
        "audio": `${audioBase}/spicy_taste.wav`
      },
      {
        "adj": "bland",
        "meaning": "nhạt",
        "audio": `${audioBase}/bland.wav`
      },
      {
        "adj": "tangy",
        "meaning": "chua dịu",
        "audio": `${audioBase}/tangy.wav`
      },
      {
        "adj": "rich",
        "meaning": "đậm đà, béo ngậy",
        "audio": `${audioBase}/rich.wav`
      },
      {
        "adj": "juicy",
        "meaning": "mọng nước",
        "audio": `${audioBase}/juicy.wav`
      }
    ]
  },
  "examples": [
    {
      "id": 1,
      "question": "The pizza looks __.",
      "answer": "delicious",
      "word": "look",
      "questionAudio": `${audioBase}/pizza_looks_question.wav`,
      "answerAudio": `${audioBase}/pizza_looks_answer.wav`,
      "imageSrc": `${imageBase}/pizza.jpg`
    },
    {
      "id": 2,
      "question": "The pizza smells __.",
      "answer": "amazing",
      "word": "smell",
      "questionAudio": `${audioBase}/pizza_smells_question.wav`,
      "answerAudio": `${audioBase}/pizza_smells_answer.wav`,
      "imageSrc": `${imageBase}/pizza.jpg`
    },
    {
      "id": 3,
      "question": "The pizza tastes __.",
      "answer": "spicy",
      "word": "taste",
      "questionAudio": `${audioBase}/pizza_tastes_question.wav`,
      "answerAudio": `${audioBase}/pizza_tastes_answer.wav`,
      "imageSrc": `${imageBase}/pizza.jpg`
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/WB_Vocabulary1",
    "imageFolder": "/images"
  }
}
export const unit4vocabulary2ReadWriteActivityDataTS: WorkbookReadWrite ={
  "slug": "unit4-our-senses-read-write",
  "unit": "Unit 4",
  "section": "Grammar1",
  "title": "Read and Write. Listen to check your answers",
  "type": "read_write",
  "instruction": "Complete the sentences with the correct words. Listen to check your answers.",
  "sentences": [
    {
      "id": 1,
      "question": "How does the bread taste? It ___ good.",
      "answer": "tastes",
      "questionAudio": `${audioBase}/how_does_the_bread_taste_question.wav`,
      "answerAudio": `${audioBase}/how_does_the_bread_taste_answer.wav`,
      "imageSrc": `${imageBase}/bread.jpg`
    },
    {
      "id": 2,
      "question": "How ___ the sock smell? It smells terrible!",
      "answer": "does",
      "questionAudio": `${audioBase}/how_does_the_sock_smell_question.wav`,
      "answerAudio": `${audioBase}/how_does_the_sock_smell_answer.wav`,
      "imageSrc": `${imageBase}/sock.jpg`
    },
    {
      "id": 3,
      "question": "How do the rocks feel? They ___ hard.",
      "answer": "feel",
      "questionAudio": `${audioBase}/how_do_the_rocks_feel_question.wav`,
      "answerAudio": `${audioBase}/how_do_the_rocks_feel_answer.wav`,
      "imageSrc": `${imageBase}/rocks.jpg`
    },
    {
      "id": 4,
      "question": "How ___ the old cars look? They look ugly.",
      "answer": "do",
      "questionAudio": `${audioBase}/how_do_the_old_cars_look_question.wav`,
      "answerAudio": `${audioBase}/how_do_the_old_cars_look_answer.wav`,
      "imageSrc": `${imageBase}/old_cars.jpg`
    },
    {
      "id": 5,
      "question": "How ___ the parrot sound? It sounds loud.",
      "answer": "does",
      "questionAudio": `${audioBase}/how_does_the_parrot_sound_question.wav`,
      "answerAudio": `${audioBase}/how_does_the_parrot_sound_answer.wav`,
      "imageSrc": `${imageBase}/parrot.jpg`
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/WB_Vocabulary1",
    "imageFolder": "/images/"
  }
}
export const unit4vocabulary2SortWordsActivityDataTS: WorkbookReadWriteSort ={
  "slug": "unit4-our-senses-vocabulary2-sort-words",
  "unit": "Unit 4",
  "section": "Vocabulary2",
  "title": "Read and Write. Sort the words. Then check your answers with a partner",
  "type": "read_write_sort",
  "instruction": "Sort the given food words into the correct categories: Sweet, Sour, Salty, Spicy, Bitter.",
  "words": [
    {
      "word": "apples",
      "examples": [
        {
          "sentence": "Apples are sweet.",
          "meaning": "Táo thì ngọt.",
          "audio": `${audioBase}/apples_are_sweet.wav`
        },
        {
          "sentence": "Sometimes apples are sour.",
          "meaning": "Đôi khi táo thì chua.",
          "audio": `${audioBase}/sometimes_apples_are_sour.wav`
        }
      ],
      "imageSrc": `${imageBase}/apples.jpg`
    },
    {
      "word": "bananas",
      "examples": [
        {
          "sentence": "Bananas are sweet.",
          "meaning": "Chuối thì ngọt.",
          "audio": `${audioBase}/bananas_are_sweet.wav`
        }
      ],
      "imageSrc": `${imageBase}/bananas.jpg`
    },
    {
      "word": "cheese",
      "examples": [
        {
          "sentence": "Cheese is salty.",
          "meaning": "Phô mai thì mặn.",
          "audio": `${audioBase}/cheese_is_salty.wav`
        }
      ],
      "imageSrc": `${imageBase}/cheese.jpg`
    },
    {
      "word": "chips",
      "examples": [
        {
          "sentence": "Chips are salty.",
          "meaning": "Khoai tây chiên thì mặn.",
          "audio": `${audioBase}/chips_are_salty.wav`
        }
      ],
      "imageSrc": `${imageBase}/chips.jpg`
    },
    {
      "word": "cookies",
      "examples": [
        {
          "sentence": "Cookies are sweet.",
          "meaning": "Bánh quy thì ngọt.",
          "audio": `${audioBase}/cookies_are_sweet.wav`
        }
      ],
      "imageSrc": `${imageBase}/cookies.jpg`
    },
    {
      "word": "mangoes",
      "examples": [
        {
          "sentence": "Mangoes are sweet.",
          "meaning": "Xoài thì ngọt.",
          "audio": `${audioBase}/mangoes_are_sweet.wav`
        },
        {
          "sentence": "Sometimes mangoes are sour.",
          "meaning": "Đôi khi xoài thì chua.",
          "audio": `${audioBase}/sometimes_mangoes_are_sour.wav`
        }
      ],
      "imageSrc": `${imageBase}/mangoes.jpg`
    },
    {
      "word": "nuts",
      "examples": [
        {
          "sentence": "Nuts are salty.",
          "meaning": "Các loại hạt thì mặn.",
          "audio": `${audioBase}/nuts_are_salty.wav`
        }
      ],
      "imageSrc": `${imageBase}/nuts.jpg`
    },
    {
      "word": "oranges",
      "examples": [
        {
          "sentence": "Oranges are sour.",
          "meaning": "Cam thì chua.",
          "audio": `${audioBase}/oranges_are_sour.wav`
        }
      ],
      "imageSrc": `${imageBase}/oranges.jpg`
    },
    {
      "word": "peppers",
      "examples": [
        {
          "sentence": "Peppers are spicy.",
          "meaning": "Ớt thì cay.",
          "audio": `${audioBase}/peppers_are_spicy.wav`
        }
      ],
      "imageSrc": `${imageBase}/peppers.jpg`
    },
    {
      "word": "salad",
      "examples": [
        {
          "sentence": "Salad can taste bitter.",
          "meaning": "Salad có thể đắng.",
          "audio": `${audioBase}/salad_can_taste_bitter.wav`
        }
      ],
      "imageSrc": `${imageBase}/salad.jpg`
    },
    {
      "word": "soup",
      "examples": [
        {
          "sentence": "Soup can be salty.",
          "meaning": "Súp có thể mặn.",
          "audio": `${audioBase}/soup_can_be_salty.wav`
        }
      ],
      "imageSrc": `${imageBase}/soup.jpg`
    },
    {
      "word": "tea",
      "examples": [
        {
          "sentence": "Tea tastes bitter.",
          "meaning": "Trà có vị đắng.",
          "audio": `${audioBase}/tea_tastes_bitter.wav`
        }
      ],
      "imageSrc": `${imageBase}/tea.jpg`
    },
    {
      "word": "yogurt",
      "examples": [
        {
          "sentence": "Yogurt tastes sour.",
          "meaning": "Sữa chua có vị chua.",
          "audio": `${audioBase}/yogurt_tastes_sour.wav`
        }
      ],
      "imageSrc": `${imageBase}/yogurt.jpg`
    }
  ],
  "categories": {
    "Sweet": [
      "apples",
      "bananas",
      "cookies",
      "mangoes"
    ],
    "Sour": [
      "oranges",
      "yogurt"
    ],
    "Salty": [
      "cheese",
      "chips",
      "nuts",
      "soup"
    ],
    "Spicy": [
      "peppers"
    ],
    "Bitter": [
      "tea",
      "salad"
    ]
  },
  "files": {
    "audioFolder": "/audio/unit4_our_senses/Vocabulary2",
    "imageFolder": "/images"
  }
}
export const unit4grammar2WasWereActivityDataTS: WorkbookGrammar2WasWere ={
  "slug": "unit4-our-senses-grammar2-was-were",
  "unit": "Unit 4",
  "section": "Grammar2",
  "title": "Practice with was/were",
  "type": "grammar_table",
  "instruction": "Look at the present tense question and answer. Then change them into the past tense using was/were.",
  "table": {
    "columns": [
      "Question (Present)",
      "Answer (Present)",
      "Question (Past)",
      "Answer (Past)"
    ],
    "rows": [
      {
        "present": {
          "question": "How is the bread?",
          "answer": "It's good."
        },
        "past": {
          "question": "How was the bread?",
          "answer": "It was good."
        },
        "tokens": {
          "question": [
            "How",
            "was",
            "the bread?"
          ],
          "answer": [
            "It",
            "was",
            "good."
          ]
        }
      },
      {
        "present": {
          "question": "How are the grapes?",
          "answer": "They're good."
        },
        "past": {
          "question": "How were the grapes?",
          "answer": "They were good."
        },
        "tokens": {
          "question": [
            "How",
            "were",
            "the grapes?"
          ],
          "answer": [
            "They",
            "were",
            "good."
          ]
        }
      }
    ]
  },
  "files": {
    "audioFolder": "/audio/unit4_our_senses/Grammar2",
    "imageFolder": "/images/unit4_our_senses/Grammar2"
  }
}
export const unit4grammar2LookMatchActivityDataTS: WorkbookGrammar2LookMatch ={
  "slug": "unit4-our-senses-grammar2-look-match",
  "unit": "Unit 4",
  "section": "Grammar2",
  "title": "Read. Look and match. Draw lines",
  "type": "look_match",
  "instruction": "Read the sentences. Look at the pictures and match them by drawing lines.",
  "pairs": [
    {
      "sentence": "The bread is good.",
      "meaning": "Ổ bánh mì thì ngon.",
      "audio": `${audioBase}/the_bread_is_good.wav`,
      "imageSrc": `${imageBase}/bread_good.jpg`
    },
    {
      "sentence": "The grapes are good.",
      "meaning": "Những quả nho thì ngon.",
      "audio": `${audioBase}/the_grapes_are_good.wav`,
      "imageSrc": `${imageBase}/grapes_good.jpg`
    },
    {
      "sentence": "The bread was good.",
      "meaning": "Ổ bánh mì đã ngon.",
      "audio": `${audioBase}/the_bread_was_good.wav`,
      "imageSrc": `${imageBase}/bread_was_good.jpg`
    },
    {
      "sentence": "The grapes were good.",
      "meaning": "Những quả nho đã ngon.",
      "audio": `${audioBase}/the_grapes_were_good.wav`,
      "imageSrc": `${imageBase}/grapes_were_good.jpg`
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/Grammar2",
    "imageFolder": "/images"
  }
}
export const unit4grammar2ReadWriteActivityDataTS: WorkbookReadWrite ={
  "slug": "unit4-our-senses-read-write-2",
  "unit": "Unit 4",
  "section": "Grammar2",
  "title": "Read and Write",
  "type": "read_write",
  "instruction": "Complete the sentences with the correct words.",
  "sentences": [
    {
      "id": 1,
      "question": "That chair ___ soft, but this chair is hard.",
      "answer": "was",
      "meaning": "Cái ghế kia thì mềm, nhưng cái ghế này thì cứng.",
      "questionAudio": `${audioBase}/that_chair_question.wav`,
      "answerAudio": `${audioBase}/that_chair_answer.wav`,
      "imageSrc": `${imageBase}/chair.jpg`
    },
    {
      "id": 2,
      "question": "How ___ the noodles? They were salty.",
      "answer": "were",
      "meaning": "Mì thì như thế nào? Chúng đã mặn.",
      "questionAudio": `${audioBase}/how_were_the_noodles_question.wav`,
      "answerAudio": `${audioBase}/how_were_the_noodles_answer.wav`,
      "imageSrc": `${imageBase}/noodles.jpg`
    },
    {
      "id": 3,
      "question": "The baby ___ quiet, but now he is crying.",
      "answer": "was",
      "meaning": "Em bé đã yên lặng, nhưng bây giờ nó đang khóc.",
      "questionAudio": `${audioBase}/the_baby_question.wav`,
      "answerAudio": `${audioBase}/the_baby_answer.wav`,
      "imageSrc": `${imageBase}/baby.jpg`
    },
    {
      "id": 4,
      "question": "How are your hands? They ___ sticky.",
      "answer": "are",
      "meaning": "Tay của bạn thế nào? Chúng dính.",
      "questionAudio": `${audioBase}/how_are_your_hands_question.wav`,
      "answerAudio": `${audioBase}/how_are_your_hands_answer.wav`,
      "imageSrc": `${imageBase}/hands.jpg`
    },
    {
      "id": 5,
      "question": "That rock was rough, but this rock ___ smooth.",
      "answer": "is",
      "meaning": "Hòn đá kia thì sần sùi, nhưng hòn đá này thì nhẵn.",
      "questionAudio": `${audioBase}/that_rock_question.wav`,
      "answerAudio": `${audioBase}/that_rock_answer.wav`,
      "imageSrc": `${imageBase}/rock.jpg`
    },
    {
      "id": 6,
      "question": "How were the tomatoes? They ___ sweet.",
      "answer": "were",
      "meaning": "Những quả cà chua thì thế nào? Chúng đã ngọt.",
      "questionAudio": `${audioBase}/how_were_the_tomatoes_question.wav`,
      "answerAudio": `${audioBase}/how_were_the_tomatoes_answer.wav`,
      "imageSrc": `${imageBase}/tomatoes.jpg`
    }
  ],
  "files": {
    "audioFolder": "/audio/unit4_our_senses/workbook",
    "imageFolder": "/images"
  }
}
export const unit4grammar2RolePlayActivityDataTS: WorkbookGrammar2RolePlay ={
  "slug": "unit4-our-senses-grammar2-role-play",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook - Grammar2 Role Play",
  "activity": "Q&A Role-play",
  "dialogue": [
    {
      "turn": 1,
      "speaker": "Person1",
      "type": "question",
      "text": "How was the yogurt?",
      "audioSrc": `${audioBase}/yogurt_question.wav`
    },
    {
      "turn": 1,
      "speaker": "Person2",
      "type": "answer",
      "text": "It was sour.",
      "audioSrc": `${audioBase}/yogurt_answer.wav`
    },
    {
      "turn": 2,
      "speaker": "Person1",
      "type": "answer",
      "text": "They were salty.",
      "audioSrc": `${audioBase}/potato_chips_answer.wav`
    },
    {
      "turn": 2,
      "speaker": "Person2",
      "type": "question",
      "text": "How were the potato chips?",
      "audioSrc": `${audioBase}/potato_chips_question.wav`
    },
    {
      "turn": 3,
      "speaker": "Person1",
      "type": "question",
      "text": "How were the carrots?",
      "audioSrc": `${audioBase}/carrots_question.wav`
    },
    {
      "turn": 3,
      "speaker": "Person2",
      "type": "answer",
      "text": "They were delicious.",
      "audioSrc": `${audioBase}/carrots_answer.wav`
    },
    {
      "turn": 4,
      "speaker": "Person1",
      "type": "answer",
      "text": "They were spicy.",
      "audioSrc": `${audioBase}/red_peppers_answer.wav`
    },
    {
      "turn": 4,
      "speaker": "Person2",
      "type": "question",
      "text": "How were the red peppers?",
      "audioSrc": `${audioBase}/red_peppers_question.wav`
    },
    {
      "turn": 5,
      "speaker": "Person1",
      "type": "question",
      "text": "How was the tea?",
      "audioSrc": `${audioBase}/tea_question.wav`
    },
    {
      "turn": 5,
      "speaker": "Person2",
      "type": "answer",
      "text": "It was bitter.",
      "audioSrc": `${audioBase}/tea_answer.wav`
    },
    {
      "turn": 6,
      "speaker": "Person1",
      "type": "answer",
      "text": "It was sweet.",
      "audioSrc": `${audioBase}/ice_cream_answer.wav`
    },
    {
      "turn": 6,
      "speaker": "Person2",
      "type": "question",
      "text": "How was the ice cream?",
      "audioSrc": `${audioBase}/ice_cream_question.wav`
    }
  ]
}
export const unit4gameTimeCrosswordActivityDataTS: WorkbookCrosswordPuzzle ={
  "slug": "unit4-our-senses-game-time-do-the-crossword-puzzle",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook - GAME TIME!",
  "activity": "Do the crossword puzzle",
  "dialogue": [
    {
      "direction": "across",
      "number": 1,
      "clue": "It's in my classroom. It's white. It feels sticky.",
      "answer": "glue",
      "row": 0,
      "col": 8,
      "length": 4,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_1_clue.wav`
        }
      }
    },
    {
      "direction": "down",
      "number": 2,
      "clue": "It's yellow. It's sour.",
      "answer": "lemon",
      "row": 0,
      "col": 9,
      "length": 5,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_2_clue.wav`
        }
      }
    },
    {
      "direction": "down",
      "number": 3,
      "clue": "It looks beautiful. It smells good.",
      "answer": "flower",
      "row": 1,
      "col": 5,
      "length": 6,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_3_clue.wav`
        }
      }
    },
    {
      "direction": "down",
      "number": 4,
      "clue": "It's small. It feels soft. It has long ears.",
      "answer": "rabbit",
      "row": 2,
      "col": 7,
      "length": 6,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_4_clue.wav`
        }
      }
    },
    {
      "direction": "across",
      "number": 5,
      "clue": "It's red. It's delicious. Sometimes it's in a salad.",
      "answer": "tomato",
      "row": 3,
      "col": 4,
      "length": 6,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_5_clue.wav`
        }
      }
    },
    {
      "direction": "across",
      "number": 6,
      "clue": "Sometimes it's green. Sometimes it's red. It's spicy.",
      "answer": "pepper",
      "row": 6,
      "col": 0,
      "length": 6,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_6_clue.wav`
        }
      }
    },
    {
      "direction": "down",
      "number": 7,
      "clue": "It's in my classroom. It's smooth.",
      "answer": "desk",
      "row": 6,
      "col": 9,
      "length": 4,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_7_clue.wav`
        }
      }
    },
    {
      "direction": "across",
      "number": 8,
      "clue": "It's tall. It's brown and rough. It has green leaves.",
      "answer": "tree",
      "row": 7,
      "col": 7,
      "length": 4,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_8_clue.wav`
        }
      }
    },
    {
      "direction": "across",
      "number": 9,
      "clue": "It can be hard or soft. It's sweet. It tastes delicious.",
      "answer": "cookie",
      "row": 9,
      "col": 6,
      "length": 6,
      "audio": {
        "clue": {
          "src": `${audioBase}/crossword_9_clue.wav`
        }
      }
    }
  ],
  "questions": {
    "0": {
      "audio": `${audioBase}/the_rafflesia_smells_terrible.wav`
    },
    "1": {
      "audio": `${audioBase}/the_eastern_snake_necked_turtle_has_a_short_neck.wav`
    },
    "2": {
      "audio": `${audioBase}/flies_like_the_smell_of_the_rafflesia.wav`
    },
    "3": {
      "audio": `${audioBase}/the_eastern_snake_necked_turtle_always_smells_bad.wav`
    },
    "4": {
      "audio": `${audioBase}/the_rafflesia_is_very_big_flower.wav`
    }
  }
}
export const unit4WorkbooklookWriteActivityDataTS: WorkbookLookWrite ={
  "slug": "unit4-our-senses-workbook-look-write",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook",
  "activity": "Look. Imagine you are in the pictures. Write",
  "questions": [
    {
      "number": 1,
      "text": "How __ your hands? They ________.",
      "image": `${imageBase}/hands.jpg`,
      "answer": {
        "question": "How were your hands?",
        "response": "They were sticky.",
        "audio": {
          "question": `${audioBase}/how_were_your_hands.wav`,
          "response": `${audioBase}/they_were_sticky.wav`
        }
      },
      "expectedWords": [
        "were",
        "sticky"
      ]
    },
    {
      "number": 2,
      "text": "How __ the soccer game? It ________.",
      "image": `${imageBase}/soccer.jpg`,
      "answer": {
        "question": "How was the soccer game?",
        "response": "It was exciting.",
        "audio": {
          "question": `${audioBase}/how_was_the_soccer_game.wav`,
          "response": `${audioBase}/it_was_exciting.wav`
        }
      },
      "expectedWords": [
        "was",
        "exciting"
      ]
    }
  ]
}
export const unit4WorkbooklistenReadFastActivityDataTS: WorkbookListenReadFast ={
  "slug": "unit4-our-senses-workbook-listen-read-fast",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook",
  "activity": "Listen and read. Can you say these fast?",
  "sentences": [
    {
      "number": 1,
      "text": "I eat sweet and sour ice cream on Sunday.",
      "meaning": "Tôi ăn kem chua ngọt vào Chủ nhật.",
      "audio": `${audioBase}/i_eat_sweet_and_sour.wav`
    },
    {
      "number": 2,
      "text": "Billions of bitter beans bounced on the bed.",
      "meaning": "Hàng tỷ hạt đắng nảy trên giường.",
      "audio": `${audioBase}/billions_of_bitter_beans.wav`
    },
    {
      "number": 3,
      "text": "Taste the terrible tea tomorrow.",
      "meaning": "Nếm thử tách trà kinh khủng vào ngày mai.",
      "audio": `${audioBase}/taste_the_terrible_tea.wav`
    }
  ]
}
export const unit4WorkbookreadingStinkyAnimalsActivityDataTS: WorkbookReadingActivity ={
  "slug": "unit4-our-senses-workbook-reading-stinky-animals-plants",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook",
  "activity": "Reading - Stinky Animals and Plants",
  "images": [
    `${imageBase}/turtle1.jpg`,
    `${imageBase}/rafflesia.jpg`,
    `${imageBase}/skunk.jpg`,
    `${imageBase}/skunk_cabbage.jpg`
  ],
  "reading": [
    {
      "number": 1,
      "text": "Stinky Animals and Plants",
      "meaning": "Động vật và thực vật có mùi hôi",
      "audio": `${audioBase}/Stinky_Animals_and_Plants.wav`
    },
    {
      "number": 2,
      "text": "Many things smell good.",
      "meaning": "Nhiều thứ có mùi thơm.",
      "audio": `${audioBase}/Many_things_smell_good.wav`
    },
    {
      "number": 3,
      "text": "Apple trees, flowers, and the ocean all smell great.",
      "meaning": "Cây táo, hoa và đại dương đều có mùi thơm dễ chịu.",
      "audio": `${audioBase}/Apple_trees_flowers_and_the_ocean_all_smell_great.wav`
    },
    {
      "number": 4,
      "text": "But some animals and plants smell terrible.",
      "meaning": "Nhưng một số động vật và thực vật có mùi rất kinh khủng.",
      "audio": `${audioBase}/But_some_animals_and_plants_smell_terrible.wav`
    },
    {
      "number": 5,
      "text": "The Eastern snake-necked turtle lives in fresh water in eastern Australia.",
      "meaning": "Rùa cổ rắn phương Đông sống trong nước ngọt ở miền đông nước Úc.",
      "audio": `${audioBase}/The_Eastern_snake_necked_turtle_lives_in_fresh_water_in_eastern_Australia.wav`
    },
    {
      "number": 6,
      "text": "This turtle has a really long neck that looks like a snake.",
      "meaning": "Loài rùa này có chiếc cổ rất dài trông giống như con rắn.",
      "audio": `${audioBase}/This_turtle_has_a_really_long_neck_that_looks_like_a_snake.wav`
    },
    {
      "number": 7,
      "text": "If you catch an Eastern snake-necked turtle, it smells terrible.",
      "meaning": "Nếu bạn bắt được một con rùa cổ rắn phương Đông, nó sẽ có mùi rất kinh khủng.",
      "audio": `${audioBase}/If_you_catch_an_Eastern_snake_necked_turtle_it_smells_terrible.wav`
    },
    {
      "number": 8,
      "text": "Some people think it smells like a skunk.",
      "meaning": "Một số người nghĩ rằng nó có mùi như chồn hôi.",
      "audio": `${audioBase}/Some_people_think_it_smells_like_a_skunk.wav`
    },
    {
      "number": 9,
      "text": "In Australia, people call this turtle the 'stinker'.",
      "meaning": "Ở Úc, người ta gọi loài rùa này là 'con hôi'.",
      "audio": `${audioBase}/In_Australia_people_call_this_turtle_the_stinker.wav`
    },
    {
      "number": 10,
      "text": "Many flowers smell good, but the rafflesia doesn't.",
      "meaning": "Nhiều loài hoa có mùi thơm, nhưng hoa xác thối thì không.",
      "audio": `${audioBase}/Many_flowers_smell_good_but_the_rafflesia_doesnt.wav`
    },
    {
      "number": 11,
      "text": "It smells terrible.",
      "meaning": "Nó có mùi rất kinh khủng.",
      "audio": `${audioBase}/It_smells_terrible.wav`
    },
    {
      "number": 12,
      "text": "The rafflesia is the biggest flower in the world.",
      "meaning": "Hoa xác thối là loài hoa lớn nhất thế giới.",
      "audio": `${audioBase}/The_rafflesia_is_the_biggest_flower_in_the_world.wav`
    },
    {
      "number": 13,
      "text": "It's almost one meter (three feet) wide.",
      "meaning": "Nó rộng gần một mét (ba feet).",
      "audio": `${audioBase}/Its_almost_one_meter_three_feet_wide.wav`
    },
    {
      "number": 14,
      "text": "The rafflesia grows in southeastern Asia.",
      "meaning": "Hoa xác thối mọc ở Đông Nam Á.",
      "audio": `${audioBase}/The_rafflesia_grows_in_southeastern_Asia.wav`
    },
    {
      "number": 15,
      "text": "The rafflesia smells like old meat.",
      "meaning": "Hoa xác thối có mùi như thịt thối rữa.",
      "audio": `${audioBase}/The_rafflesia_smells_like_old_meat.wav`
    },
    {
      "number": 16,
      "text": "Flies like the smell, and they fly to the rafflesia flower.",
      "meaning": "Ruồi thích mùi đó và bay đến hoa xác thối.",
      "audio": `${audioBase}/Flies_like_the_smell_and_they_fly_to_the_rafflesia_flower.wav`
    },
    {
      "number": 17,
      "text": "Weird but true: Skunk cabbage is a plant. It smells like a skunk.",
      "meaning": "Thật lạ nhưng đúng: cây bắp cải chồn là một loài thực vật. Nó có mùi như chồn hôi.",
      "audio": `${audioBase}/Weird_but_true_Skunk_cabbage_is_a_plant_It_smells_like_a_skunk.wav`
    }
  ],
  "vocabulary": [
    {
      "word": "long neck",
      "meaning": "cổ dài",
      "audio": `${audioBase}/long_neck.wav`,
      "image": `${imageBase}/long_neck.jpg`
    },
    {
      "word": "look like",
      "meaning": "trông giống như",
      "audio": `${audioBase}/look_like.wav`,
      "image": `${imageBase}/look_like.jpg`
    },
    {
      "word": "skunk",
      "meaning": "chồn hôi",
      "audio": `${audioBase}/skunk.wav`,
      "image": `${imageBase}/skunk.jpg`
    },
    {
      "word": "Australia",
      "meaning": "Úc",
      "audio": `${audioBase}/australia.wav`,
      "image": `${imageBase}/australia.jpg`
    },
    {
      "word": "the biggest",
      "meaning": "lớn nhất",
      "audio": `${audioBase}/the_biggest.wav`,
      "image": `${imageBase}/the_biggest.jpg`
    },
    {
      "word": "almost one meter wide",
      "meaning": "rộng gần một mét",
      "audio": `${audioBase}/almost_one_meter_wide.wav`,
      "image": `${imageBase}/almost_one_meter_wide.jpg`
    },
    {
      "word": "grow in",
      "meaning": "mọc ở",
      "audio": `${audioBase}/grow_in.wav`,
      "image": `${imageBase}/grow_in.jpg`
    },
    {
      "word": "southeastern Asia",
      "meaning": "Đông Nam Á",
      "audio": `${audioBase}/southeastern_asia.wav`,
      "image": `${imageBase}/southeastern_asia.jpg`
    },
    {
      "word": "meat",
      "meaning": "thịt",
      "audio": `${audioBase}/meat.mp3`,
      "image": `${imageBase}/meat.jpg`
    }
  ]
}
export const unit4WorkbookreadingTrueFalseActivityDataTS: WorkbookReadingTrueFalse ={
  "slug": "unit4-our-senses-workbook-reading-true-false",
  "unit": "Unit 4",
  "section": "Our Senses",
  "activity": "Read. Check T for True or F for False",
  "questions": [
    {
      "text": "The rafflesia smells terrible.",
      "answer": "T",
      "vi": "Hoa rafflesia có mùi rất kinh khủng.",
      "audio": `${audioBase}/the_rafflesia_smells_terrible.wav`
    },
    {
      "text": "The Eastern snake-necked turtle has a short neck.",
      "answer": "F",
      "vi": "Rùa cổ rắn phương Đông có cái cổ dài chứ không ngắn.",
      "audio": `${audioBase}/the_eastern_snake_necked_turtle_has_a_short_neck.wav`
    },
    {
      "text": "Flies like the smell of the rafflesia.",
      "answer": "T",
      "vi": "Ruồi thích mùi của hoa rafflesia.",
      "audio": `${audioBase}/flies_like_the_smell_of_the_rafflesia.wav`
    },
    {
      "text": "The Eastern snake-necked turtle always smells bad.",
      "answer": "F",
      "vi": "Rùa cổ rắn phương Đông chỉ bốc mùi khi bị bắt, không phải lúc nào cũng hôi.",
      "audio": `${audioBase}/the_eastern_snake_necked_turtle_always_smells_bad.wav`
    },
    {
      "text": "The rafflesia is very big flower.",
      "answer": "T",
      "vi": "Hoa rafflesia là một loài hoa rất lớn.",
      "audio": `${audioBase}/the_rafflesia_is_very_big_flower.wav`
    }
  ]
}
export const unit4WorkbookreadingCompleteChartActivityDataTS: WorkbookReadingCompleteChart ={
  "slug": "unit4-our-senses-workbook-reading-complete-chart",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook",
  "activity": "Read. Complete the chart",
  "title": "Stinky animals and plants",
  "chart": {
    "animal": {
      "title": "Animal",
      "name": "Eastern snake-necked turtle",
      "questions": [
        {
          "question": "Where does it live?",
          "answer": "It lives in fresh water in eastern Australia.",
          "audio": {
            "question": `${audioBase}/animal-q1.wav`,
            "answer": `${audioBase}/animal-a1.wav`
          }
        },
        {
          "question": "What does it smell like?",
          "answer": "It smells terrible, like a skunk.",
          "audio": {
            "question": `${audioBase}/animal-q2.wav`,
            "answer": `${audioBase}/animal-a2.wav`
          }
        },
        {
          "question": "When does it smell terrible?",
          "answer": "It smells terrible when caught.",
          "audio": {
            "question": `${audioBase}/animal-q3.wav`,
            "answer": `${audioBase}/animal-a3.wav`
          }
        }
      ]
    },
    "plant": {
      "title": "Plant",
      "name": "Rafflesia",
      "questions": [
        {
          "question": "Where does it grow?",
          "answer": "It grows in southeastern Asia.",
          "audio": {
            "question": `${audioBase}/plant-q1.wav`,
            "answer": `${audioBase}/plant-a1.wav`
          }
        },
        {
          "question": "What does it smell like?",
          "answer": "It smells like old meat.",
          "audio": {
            "question": `${audioBase}/plant-q2.wav`,
            "answer": `${audioBase}/plant-a2.wav`
          }
        },
        {
          "question": "What likes its smell?",
          "answer": "Flies like its smell and come to the flower.",
          "audio": {
            "question": `${audioBase}/plant-q3.wav`,
            "answer": `${audioBase}/plant-a3.wav`
          }
        }
      ]
    }
  }
}

export const unit4WorkbookreadWriteTurtleActivityDataTS: WorkbookReadWriteTurtle ={
  "slug": "unit4-our-senses-workbook-read-write-turtle",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook",
  "activity": "Read and write",
  "instruction": "Do you want to have an Eastern snake-necked turtle at home? Why? Ask your partner and write.",
  "table": {
    "columns": [
      "",
      "Yes",
      "No",
      "Why"
    ],
    "rows": [
      {
        "subject": "You",
        "yes": "",
        "no": "",
        "why": ""
      },
      {
        "subject": "Your partner",
        "yes": "",
        "no": "",
        "why": ""
      }
    ]
  }
}
export const unit4WorkbookreadWriteWinterActivityDataTS: WorkbookReadWriteWinter ={
  "slug": "unit4-our-senses-workbook-read-write-winter",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook",
  "activity": "Read and write",
  "instruction": "Read about winter. Use 'or' to join the underlined sentences. Write the sentences.",
  "passage": [
    {
      "text": "I like winter.",
      "underlined": false,
      "audio": `${audioBase}/winter_1.wav`
    },
    {
      "text": "We throw snowballs, sometimes we build a snowman.",
      "underlined": true,
      "audio": `${audioBase}/winter_2.wav`
    },
    {
      "text": "We feel cold after we play in the snow.",
      "underlined": false,
      "audio": `${audioBase}/winter_3.wav`
    },
    {
      "text": "We sit by the fireplace, sometimes we take a hot shower.",
      "underlined": true,
      "audio": `${audioBase}/winter_4.wav`
    },
    {
      "text": "Then we have a snack.",
      "underlined": false,
      "audio": `${audioBase}/winter_5.wav`
    },
    {
      "text": "We eat soup, sometimes we drink hot chocolate.",
      "underlined": true,
      "audio": `${audioBase}/winter_6.wav`
    }
  ],
  "writingTask": {
    "example": {
      "before": [
        "We throw snowballs.",
        "Sometimes we build a snowman."
      ],
      "after": "We throw snowballs or sometimes we build a snowman."
    },
    "correctAnswers": [
      "We throw snowballs or sometimes we build a snowman.",
      "We sit by the fireplace or sometimes we take a hot shower.",
      "We eat soup or sometimes we drink hot chocolate."
    ],
    "modelAnswer": "I like winter. We throw snowballs or sometimes we build a snowman. We feel cold after we play in the snow. We sit by the fireplace or sometimes we take a hot shower. Then we have a snack. We eat soup or sometimes we drink hot chocolate.",
    "modelAnswerAudio": `${audioBase}/winter_model_answer.wav`
  }
}
export const unit4WorkbookreadChooseActivityDataTS: WorkbookReadChoose ={
  "slug": "unit4-our-senses-workbook-read-choose",
  "unit": "Unit 4 - Our Senses",
  "section": "Workbook",
  "activity": "Read and choose",
  "instruction": "Read and choose. Write the best answer.",
  "questions": [
    {
      "text": "I don't like this tea. It __ bitter.",
      "options": [
        "a. smells",
        "b. tastes",
        "c. looks"
      ],
      "answer": "b. tastes",
      "vi": "Tôi không thích trà này. Nó có vị đắng.",
      "audio": {
        "question": `${audioBase}/q1-2.wav`,
        "answer": `${audioBase}/a1-2.wav`
      }
    },
    {
      "text": "The children were listening to the teacher. They were __.",
      "options": [
        "a. quiet",
        "b. dry",
        "c. loud"
      ],
      "answer": "a. quiet",
      "vi": "Bọn trẻ đang nghe cô giáo. Chúng im lặng.",
      "audio": {
        "question": `${audioBase}/q2-2.wav`,
        "answer": `${audioBase}/a2-2.wav`
      }
    },
    {
      "text": "How was the mango? It __ delicious!",
      "options": [
        "a. is",
        "b. was",
        "c. were"
      ],
      "answer": "b. was",
      "vi": "Quả xoài thế nào? Nó thật ngon!",
      "audio": {
        "question": `${audioBase}/q3-2.wav`,
        "answer": `${audioBase}/a3-2.wav`
      }
    },
    {
      "text": "I like this sweater. It __ soft.",
      "options": [
        "a. sounds",
        "b. smells",
        "c. feels"
      ],
      "answer": "c. feels",
      "vi": "Tôi thích chiếc áo len này. Nó mềm mại.",
      "audio": {
        "question": `${audioBase}/q4-2.wav`,
        "answer": `${audioBase}/a4-2.wav`
      }
    },
    {
      "text": "A lemon is __.",
      "options": [
        "a. sour",
        "b. sweet",
        "c. spicy"
      ],
      "answer": "a. sour",
      "vi": "Một quả chanh có vị chua.",
      "audio": {
        "question": `${audioBase}/q5-2.wav`,
        "answer": `${audioBase}/a5-2.wav`
      }
    },
    {
      "text": "How __ the potato chips? They were great! More please!",
      "options": [
        "a. is",
        "b. was",
        "c. were"
      ],
      "answer": "c. were",
      "vi": "Khoai tây chiên thế nào? Rất ngon! Cho thêm nữa!",
      "audio": {
        "question": `${audioBase}/q6-2.wav`,
        "answer": `${audioBase}/a6-2.wav`
      }
    }
  ]
}
export const unit4WorkbookReadWriteFromBoxActivityDataTS: WorkbookReadWriteFromBox ={
  "type": "Read and Write",
  "instruction": "Use words from the box: hard, loud, quiet, salty, soft, spicy, sticky, sweet, terrible.",
  "questions": [
    {
      "question": "How was the music?",
      "question_vi": "Âm nhạc như thế nào?",
      "possible_answers": [
        {
          "text": "The music was loud",
          "vi": "Âm nhạc ồn ào"
        },
        {
          "text": "The music was quiet",
          "vi": "Âm nhạc yên lặng"
        },
        {
          "text": "The music was terrible",
          "vi": "Âm nhạc tệ hại"
        }
      ],
      "correct_answer": "The music was loud",
      "audio": `${audioBase}/music_question.wav`
    },
    {
      "question": "How were the noodles?",
      "question_vi": "Mì như thế nào?",
      "possible_answers": [
        {
          "text": "The noodles were salty",
          "vi": "Mì mặn"
        },
        {
          "text": "The noodles were spicy",
          "vi": "Mì cay"
        },
        {
          "text": "The noodles were sweet",
          "vi": "Mì ngọt"
        }
      ],
      "correct_answer": "The noodles were spicy",
      "audio": `${audioBase}/noodles_question.wav`
    },
    {
      "question": "How was the restaurant?",
      "question_vi": "Nhà hàng như thế nào?",
      "possible_answers": [
        {
          "text": "The restaurant was terrible",
          "vi": "Nhà hàng tệ"
        },
        {
          "text": "The restaurant was quiet",
          "vi": "Nhà hàng yên tĩnh"
        },
        {
          "text": "The restaurant was loud",
          "vi": "Nhà hàng ồn ào"
        }
      ],
      "correct_answer": "The restaurant was terrible",
      "audio": `${audioBase}/restaurant_question.wav`
    },
    {
      "question": "How were the beans?",
      "question_vi": "Đậu như thế nào?",
      "possible_answers": [
        {
          "text": "The beans were soft",
          "vi": "Đậu mềm"
        },
        {
          "text": "The beans were hard",
          "vi": "Đậu cứng"
        },
        {
          "text": "The beans were sticky",
          "vi": "Đậu dính"
        }
      ],
      "correct_answer": "The beans were soft",
      "audio": `${audioBase}/beans_question.wav`
    }
  ]
}
export const unit4WorkbookreadWriteSenseTableActivityDataTS: WorkbookSenseVerbTable ={
  "type": "Read and Write",
  "instruction": "Then work with a partner to check your answers. Use the sense verbs: look, sound, taste, feel, smell.",
  "table": {
    "headers": [
      "",
      "Yogurt",
      "Nuts",
      "Crocodile",
      "Ocean"
    ],
    "rows": [
      {
        "sense": "look",
        "vi": "trông như",
        "Yogurt": {
          "text": "Yogurt looks soft",
          "vi": "Sữa chua trông mềm",
          "audio": `${audioBase}/yogurt_look.wav`
        },
        "Nuts": {
          "text": "Nuts look hard",
          "vi": "Hạt trông cứng",
          "audio": `${audioBase}/nuts_look.wav`
        },
        "Crocodile": {
          "text": "The crocodile looks scary",
          "vi": "Cá sấu trông đáng sợ",
          "audio": `${audioBase}/crocodile_look.wav`
        },
        "Ocean": {
          "text": "The ocean looks beautiful",
          "vi": "Đại dương trông đẹp",
          "audio": `${audioBase}/ocean_look.wav`
        }
      },
      {
        "sense": "sound",
        "vi": "nghe như",
        "Yogurt": {
          "text": "Yogurt sounds delicious",
          "vi": "Sữa chua nghe ngon",
          "audio": `${audioBase}/yogurt_sound.wav`
        },
        "Nuts": {
          "text": "Nuts sound crunchy",
          "vi": "Hạt nghe giòn",
          "audio": `${audioBase}/nuts_sound.wav`
        },
        "Crocodile": {
          "text": "The crocodile sounds dangerous",
          "vi": "Cá sấu nghe nguy hiểm",
          "audio": `${audioBase}/crocodile_sound.wav`
        },
        "Ocean": {
          "text": "The ocean sounds noisy",
          "vi": "Đại dương nghe ồn ào",
          "audio": `${audioBase}/ocean_sound.wav`
        }
      },
      {
        "sense": "taste",
        "vi": "có vị",
        "Yogurt": {
          "text": "Yogurt tastes sweet",
          "vi": "Sữa chua có vị ngọt",
          "audio": `${audioBase}/yogurt_taste.wav`
        },
        "Nuts": {
          "text": "Nuts taste salty",
          "vi": "Hạt có vị mặn",
          "audio": `${audioBase}/nuts_taste.wav`
        },
        "Crocodile": {
          "text": "Crocodile meat tastes strange",
          "vi": "Thịt cá sấu có vị lạ",
          "audio": `${audioBase}/crocodile_taste.wav`
        },
        "Ocean": {
          "text": "The ocean tastes salty",
          "vi": "Đại dương có vị mặn",
          "audio": `${audioBase}/ocean_taste.wav`
        }
      },
      {
        "sense": "feel",
        "vi": "cảm thấy",
        "Yogurt": {
          "text": "Yogurt feels sticky",
          "vi": "Sữa chua cảm thấy dính",
          "audio": `${audioBase}/yogurt_feel.wav`
        },
        "Nuts": {
          "text": "Nuts feel hard",
          "vi": "Hạt cảm thấy cứng",
          "audio": `${audioBase}/nuts_feel.wav`
        },
        "Crocodile": {
          "text": "A crocodile feels rough",
          "vi": "Cá sấu cảm thấy thô ráp",
          "audio": `${audioBase}/crocodile_feel.wav`
        },
        "Ocean": {
          "text": "The ocean feels cold",
          "vi": "Đại dương cảm thấy lạnh",
          "audio": `${audioBase}/ocean_feel.wav`
        }
      },
      {
        "sense": "smell",
        "vi": "ngửi thấy",
        "Yogurt": {
          "text": "Yogurt smells fresh",
          "vi": "Sữa chua ngửi thấy tươi",
          "audio": `${audioBase}/yogurt_smell.wav`
        },
        "Nuts": {
          "text": "Nuts smell good",
          "vi": "Hạt ngửi thấy thơm",
          "audio": `${audioBase}/nuts_smell.wav`
        },
        "Crocodile": {
          "text": "A crocodile smells bad",
          "vi": "Cá sấu ngửi thấy hôi",
          "audio":`${audioBase}/crocodile_smell.wav`
        },
        "Ocean": {
          "text": "The ocean smells salty",
          "vi": "Đại dương ngửi thấy mặn",
          "audio": `${audioBase}/ocean_smell.wav`
        }
      }
    ]
  }
}
export const unit4SpinDataVocaActivityDataTS: SpinTabData ={
  "slug": "workbook-spin-wheel-vocab",
  "unit": "Workbook - Spin The Wheel",
  "section": "Vocabulary - Spin Wheel",
  "activity": "Spin the Wheel - Vocabulary",
  "language": "en",
  "createdAt": {
    "$date": "2025-09-21T07:55:39.041Z"
  },
  "items": [
    {
      "id": 1,
      "word": "flowers",
      "type": "noun",
      "image": `${imageBase}/flowers.jpg`,
      "audio": `${audioBase}/flowers.wav`,
      "questions": [
        {
          "q": "How do flowers look?",
          "audio":`${audioBase}/q_how_do_flowers_look.wav`
        },
        {
          "q": "How do flowers smell?",
          "audio": `${audioBase}/q_how_do_flowers_smell.wav`
        }
      ]
    },
    {
      "id": 2,
      "word": "a dress",
      "type": "noun",
      "image": `${imageBase}/a_dress.jpg`,
      "audio": `${audioBase}/a_dress.wav`,
      "questions": [
        {
          "q": "How does a dress look?",
          "audio": `${audioBase}/q_how_does_a_dress_look.wav`
        },
        {
          "q": "How does a dress feel?",
          "audio": `${audioBase}/q_how_does_a_dress_feel.wav`
        }
      ]
    },
    {
      "id": 3,
      "word": "candy",
      "type": "noun",
      "image": `${imageBase}/candy.jpg`,
      "audio": `${audioBase}/candy.wav`,
      "questions": [
        {
          "q": "How does candy taste?",
          "audio": `${audioBase}/q_how_does_candy_taste.wav`
        }
      ]
    },
    {
      "id": 4,
      "word": "rocks",
      "type": "noun",
      "image": `${imageBase}/rocks.jpg`,
      "audio": `${audioBase}/rocks.wav`,
      "questions": [
        {
          "q": "How do rocks feel?",
          "audio": `${audioBase}/q_how_do_rocks_feel.wav`
        },
        {
          "q": "How do rocks look?",
          "audio":`${audioBase}/q_how_do_rocks_look.wav`
        }
      ]
    },
    {
      "id": 5,
      "word": "glue",
      "type": "noun",
      "image": `${imageBase}/glue.jpg`,
      "audio": `${audioBase}/glue.wav`,
      "questions": [
        {
          "q": "How does glue feel?",
          "audio": `${audioBase}/q_how_does_glue_feel.wav`
        },
        {
          "q": "How does glue smell?",
          "audio": `${audioBase}/q_how_does_glue_smell.wav`
        }
      ]
    },
    {
      "id": 6,
      "word": "hamsters",
      "type": "noun",
      "image": `${imageBase}/hamsters.jpg`,
      "audio": `${audioBase}/hamsters.wav`,
      "questions": [
        {
          "q": "How do hamsters look?",
          "audio": `${audioBase}/q_how_do_hamsters_look.wav`
        },
        {
          "q": "How do hamsters feel?",
          "audio": `${audioBase}/q_how_do_hamsters_feel.wav`
        }
      ]
    },
    {
      "id": 7,
      "word": "potato chips",
      "type": "noun",
      "image": `${imageBase}/potato_chips.jpg`,
      "audio": `${audioBase}/potato_chips.wav`,
      "questions": [
        {
          "q": "How do potato chips taste?",
          "audio": `${audioBase}/q_how_do_potato_chips_taste.wav`
        },
        {
          "q": "How do potato chips sound?",
          "audio": `${audioBase}/q_how_do_potato_chips_sound.wav`
        }
      ]
    },
    {
      "id": 8,
      "word": "music",
      "type": "noun",
      "image": `${imageBase}/music.jpg`,
      "audio": `${audioBase}/music.wav`,
      "questions": [
        {
          "q": "How does music sound?",
          "audio": `${audioBase}/q_how_does_music_sound.wav`
        }
      ]
    }
  ],
  "settings": {
    "wheelSegments": 8,
    "randomizeOrder": true,
    "showImages": true,
    "showAudioButton": true,
    "rewardOnPick": true
  }
}
export const unit4SpinDataToBeActivityDataTS: SpinTabData ={
  "slug": "workbook-spin-wheel-to-be",
  "unit": "Workbook - Spin The Wheel",
  "section": "Grammar - To be (was/were/is/are)",
  "activity": "Spin the Wheel - To be Questions",
  "language": "en",
  "createdAt": {
    "$date": "2025-09-21T09:04:44.785Z"
  },
  "items": [
    {
      "id": 1,
      "word": "ice cream",
      "image": `${imageBase}/ice_cream.jpg`,
      "audio": `${audioBase}/ice_cream.wav`,
      "questions": [
        {
          "q": "How was the ice cream?",
          "audio": `${audioBase}/q_how_was_the_ice_cream.wav`
        },
        {
          "q": "How is the ice cream?",
          "audio": `${audioBase}/q_how_is_the_ice_cream.wav`
        }
      ]
    },
    {
      "id": 2,
      "word": "cookies",
      "image": `${imageBase}/cookies.jpg`,
      "audio": `${audioBase}/cookies.wav`,
      "questions": [
        {
          "q": "How were the cookies?",
          "audio": `${audioBase}/q_how_were_the_cookies.wav`
        },
        {
          "q": "How are the cookies?",
          "audio": `${audioBase}/q_how_are_the_cookies.wav`
        }
      ]
    },
    {
      "id": 3,
      "word": "music",
      "image": `${imageBase}/music.jpg`,
      "audio": `${audioBase}/music.wav`,
      "questions": [
        {
          "q": "How was the music?",
          "audio": `${audioBase}/q_how_was_the_music.wav`
        },
        {
          "q": "How is the music?",
          "audio": `${audioBase}/q_how_is_the_music.wav`
        }
      ]
    },
    {
      "id": 4,
      "word": "noodles",
      "image": `${imageBase}/noodles.jpg`,
      "audio": `${audioBase}/noodles.wav`,
      "questions": [
        {
          "q": "How were the noodles?",
          "audio": `${audioBase}/q_how_were_the_noodles.wav`
        },
        {
          "q": "How are the noodles?",
          "audio": `${audioBase}/q_how_are_the_noodles.wav`
        }
      ]
    }
  ],
  "settings": {
    "wheelSegments": 4,
    "randomizeOrder": true,
    "showImages": true,
    "showAudioButton": true,
    "rewardOnPick": true
  }
}
export const unit4SpinDataTasteActivityDataTS: SpinTabData ={
  "slug": "workbook-spin-wheel-taste",
  "unit": "Workbook - Spin The Wheel",
  "section": "Vocabulary - Taste",
  "activity": "Spin the Wheel - Taste Questions",
  "language": "en",
  "createdAt": {
    "$date": "2025-09-21T09:42:52.748Z"
  },
  "items": [
    {
      "id": 1,
      "word": "candy",
      "taste": "sweet",
      "image": `${imageBase}/candy.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 2,
      "word": "honey",
      "taste": "sweet",
      "image": `${imageBase}/honey.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 3,
      "word": "potato chips",
      "taste": "salty",
      "image": `${imageBase}/potato_chips.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 4,
      "word": "cheese",
      "taste": "salty",
      "image": `${imageBase}/cheese.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 5,
      "word": "oranges",
      "taste": "sour",
      "image": `${imageBase}/oranges.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 6,
      "word": "lemon",
      "taste": "sour",
      "image": `${imageBase}/lemon.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 7,
      "word": "peppers",
      "taste": "spicy",
      "image": `${imageBase}/peppers.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 8,
      "word": "soup",
      "taste": "spicy",
      "image": `${imageBase}/soup.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 9,
      "word": "tea",
      "taste": "bitter",
      "image": `${imageBase}/tea.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    },
    {
      "id": 10,
      "word": "coffee",
      "taste": "bitter",
      "image": `${imageBase}/coffee.jpg`,
      "questions": [
        {
          "q": "How does it taste?",
          "audio": `${audioBase}/q_how_does_it_taste.wav`
        }
      ]
    }
  ],
  "settings": {
    "wheelSegments": 10,
    "randomizeOrder": true,
    "showImages": true,
    "showAudioButton": true,
    "rewardOnPick": true
  }
}