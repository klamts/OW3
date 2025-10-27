import {
  Unit1Vocabulary1Data,
  Unit1SongData,
  Unit1Grammar1Data,
  Unit1Vocabulary2Data,
  Unit1Grammar2Data,
  Unit1ReadingData,
  Unit1WritingData
} from "./type";
const audioBase = "https://raw.githubusercontent.com/klamts/Unit1_A_Helping_Hand/main";
const imageBase = "https://raw.githubusercontent.com/klamts/images/main";
// export const unit1Vocabulary1DataTS: Unit1Vocabulary1Data = {
//   "slug": "unit1-family-and-friends-vocabulary1",
//   "unit": "Unit 1 – Family and Friends",
//   "sections": [
//     {
//       "section_name": "Listen and Read",
//       "description": "Read the words",
//       "words": [
//         {
//           "word": "carry",
//           "vi": "mang, bế",
//           "image": `${imageBase}/carry.jpg`,
//           "audio": `${audioBase}/carry.wav`,
//           "ipa": "/ˈkæri/"
//         },
//         {
//           "word": "help",
//           "vi": "giúp đỡ",
//           "image": `${imageBase}/help.jpg`,
//           "audio": `${audioBase}/help.wav`,
//           "ipa": "/help/"
//         },
//         {
//           "word": "hug",
//           "vi": "ôm",
//           "image": `${imageBase}/hug.jpg`,
//           "audio": `${audioBase}/hug.wav`,
//           "ipa": "/hʌɡ/"
//         },
//         {
//           "word": "teach",
//           "vi": "dạy",
//           "image": `${imageBase}/teach.jpg`,
//           "audio": `${audioBase}/teach.wav`,
//           "ipa": "/tiːtʃ/"
//         },
//         {
//           "word": "hold hands",
//           "vi": "nắm tay",
//           "image": `${imageBase}/hold_hands.jpg`,
//           "audio": `${audioBase}/hold_hands.wav`,
//           "ipa": "/həʊld hændz/"
//         },
//         {
//           "word": "feed my pet",
//           "vi": "cho thú cưng ăn",
//           "image": `${imageBase}/feed_my_pet.jpg`,
//           "audio": `${audioBase}/feed_my_pet.wav`,
//           "ipa": "/fiːd maɪ pet/"
//         },
//         {
//           "word": "a goldfish",
//           "vi": "một con cá vàng",
//           "image": `${imageBase}/goldfish.jpg`,
//           "audio": `${audioBase}/goldfish.wav`,
//           "ipa": "/ˈɡəʊld.fɪʃ/"
//         },
//         {
//           "word": "take care of my pet",
//           "vi": "chăm sóc thú cưng của tôi",
//           "image": `${imageBase}/take_care_of_my_pet.jpg`,
//           "audio": `${audioBase}/take_care_of_my_pet.wav`,
//           "ipa": "/teɪk keər əv maɪ pet/"
//         },
//         {
//           "word": "pick up",
//           "vi": "nhặt lên, bế lên",
//           "image": `${imageBase}/pick_up.jpg`,
//           "audio": `${audioBase}/pick_up.wav`,
//           "ipa": "/pɪk ʌp/"
//         },
//         {
//           "word": "give my pet a bath",
//           "vi": "tắm cho thú cưng của tôi",
//           "image": `${imageBase}/give_my_pet_a_bath.jpg`,
//           "audio": `${audioBase}/give_my_pet_a_bath.wav`,
//           "ipa": "/ɡɪv maɪ pet ə bɑːθ/"
//         },
//         {
//           "word": "protect",
//           "vi": "bảo vệ",
//           "image": `${imageBase}/protect.jpg`,
//           "audio": `${audioBase}/protect.wav`,
//           "ipa": "/prəˈtekt/"
//         }
//       ]
//     },
//     {
//       "section_name": "Ask and Answer",
//       "type": "Activity",
//       "instruction": "Work with a partner. Ask and answer.",
//       "items": [
//         {
//           "question": "What do you like to do?",
//           "answer": "I like to take care of my goldfish.",
//           "image": `${imageBase}/take_care_of_my_goldfish.jpg`,
//           "audio_question": `${audioBase}/what_do_you_like_to_do.wav`,
//           "audio_answer": `${audioBase}/i_like_to_take_care_of_my_goldfish.wav`
//         }
//       ],
//       "audio_instruction": `${audioBase}/ask_and_answer_instruction.wav`
//     }
//   ]
// };
export const unit1Vocabulary1DataTS: Unit1Vocabulary1Data = {
 "slug": "unit1_vocabulary1",
  "title": "Unit 1 – Vocabulary 1",
  "sections": [
    {
      "slug": "listen_and_read",
      "section": "Listen and read",
      "type": "Vocabulary",
      "instruction": "Learn the words, listen to the examples, and repeat.",
      "instruction_vi": "Học các từ, nghe ví dụ và lặp lại.",
      "words": [
        {
          "word": "carry",
          "translation": "mang, xách",
          "ipa": "/ˈkæri/",
          "audio": `${audioBase}/carry.wav`,
          "image": `${imageBase}/carry.jpg`,
          "example": {
            "sentence": "I can carry my school bag.",
            "translation": "Tôi có thể mang cặp sách của mình.",
            "audio": `${audioBase}/example_carry.wav`
          }
        },
        {
          "word": "help",
          "translation": "giúp đỡ",
          "ipa": "/help/",
          "audio": `${audioBase}/help.wav`,
          "image": `${imageBase}/help.jpg`,
          "example": {
            "sentence": "I help my mom cook dinner.",
            "translation": "Tôi giúp mẹ nấu bữa tối.",
            "audio": `${audioBase}/example_help.wav`
          }
        },
        {
          "word": "hug",
          "translation": "ôm",
          "ipa": "/hʌɡ/",
          "audio": `${audioBase}/hug.wav`,
          "image": `${imageBase}/hug.jpg`,
          "example": {
            "sentence": "I hug my grandmother every morning.",
            "translation": "Tôi ôm bà tôi mỗi sáng.",
            "audio": `${audioBase}/example_hug.wav`
          }
        },
        {
          "word": "teach",
          "translation": "dạy",
          "ipa": "/tiːtʃ/",
          "audio": `${audioBase}/teach.wav`,
          "image": `${imageBase}/teach.jpg`,
          "example": {
            "sentence": "I teach my little brother to read.",
            "translation": "Tôi dạy em trai tôi đọc.",
            "audio": `${audioBase}/example_teach.wav`
          }
        },
        {
          "word": "hold hands",
          "translation": "nắm tay",
          "ipa": "/hoʊld hændz/",
          "audio": `${audioBase}/hold_hands.wav`,
          "image": `${imageBase}/hold_hands.jpg`,
          "example": {
            "sentence": "I hold hands with my friends on the way to school.",
            "translation": "Tôi nắm tay bạn khi đi học.",
            "audio": `${audioBase}/example_hold_hands.wav`
          }
        },
        {
          "word": "feed my pet",
          "translation": "cho thú cưng ăn",
          "ipa": "/fiːd maɪ pɛt/",
          "audio": `${audioBase}/feed_my_pet.wav`,
          "image": `${imageBase}/feed_my_pet.jpg`,
          "example": {
            "sentence": "I feed my cat every morning.",
            "translation": "Tôi cho mèo ăn mỗi sáng.",
            "audio": `${audioBase}/example_feed_my_pet.wav`
          }
        },
        {
          "word": "take care of my pet",
          "translation": "chăm sóc thú cưng của tôi",
          "ipa": "/teɪk keər əv maɪ pɛt/",
          "audio": `${audioBase}/take_care_of_my_pet.wav`,
          "image": `${imageBase}/take_care_of_my_pet.jpg`,
          "example": {
            "sentence": "I take care of my dog after school.",
            "translation": "Tôi chăm sóc con chó của mình sau giờ học.",
            "audio": `${audioBase}/example_take_care_of_my_pet.wav`
          }
        },
        {
          "word": "pick up",
          "translation": "nhặt lên",
          "ipa": "/pɪk ʌp/",
          "audio": `${audioBase}/pick_up.wav`,
          "image": `${imageBase}/pick_up.jpg`,
          "example": {
            "sentence": "I pick up my toys after playing.",
            "translation": "Tôi nhặt đồ chơi sau khi chơi xong.",
            "audio": `${audioBase}/example_pick_up.wav`
          }
        },
        {
          "word": "give my pet a bath",
          "translation": "tắm cho thú cưng của tôi",
          "ipa": "/ɡɪv maɪ pɛt ə bæθ/",
          "audio": `${audioBase}/give_my_pet_a_bath.wav`,
          "image": `${imageBase}/give_my_pet_a_bath.jpg`,
          "example": {
            "sentence": "I give my dog a bath on weekends.",
            "translation": "Tôi tắm cho con chó của mình vào cuối tuần.",
            "audio": `${audioBase}/example_give_my_pet_a_bath.wav`
          }
        },
        {
          "word": "protect",
          "translation": "bảo vệ",
          "ipa": "/prəˈtɛkt/",
          "audio": `${audioBase}/protect.wav`,
          "image": `${imageBase}/protect.jpg`,
          "example": {
            "sentence": "I protect my little sister from danger.",
            "translation": "Tôi bảo vệ em gái khỏi nguy hiểm.",
            "audio": `${audioBase}/example_protect.wav`
          }
        }
      ]
    },
    {
      "slug": "ask_and_answer",
      "section": "Ask and answer",
      "type": "Speaking",
      "instruction": "Work with a partner. Ask and answer.",
      "instruction_vi": "Làm việc cùng bạn. Hỏi và trả lời.",
      "examples": [
        {
          "description": "What do you like to do?",
          "translation": "Bạn thích làm gì?",
          "answer": "I like to take care of my goldfish.",
          "answer_vi": "Tôi thích chăm sóc cá vàng của mình.",
          "audio": `${audioBase}/example1.wav`,
          "audio_question": `${audioBase}/what_do_you_like_to_do.wav`
        },
        {
          "description": "What do you like to do?",
          "translation": "Bạn thích làm gì?",
          "answer": "I like helping my mom.",
          "answer_vi": "Tôi thích giúp mẹ tôi.",
          "audio": `${audioBase}/example2.wav`,
          "audio_question": `${audioBase}/what_do_you_like_to_do.wav`
        },
        {
          "description": "What do you like to do?",
          "translation": "Bạn thích làm gì?",
          "answer": "I like to hug my grandmother.",
          "answer_vi": "Tôi thích ôm bà của mình.",
          "audio": `${audioBase}/example3.wav`,
          "audio_question": `${audioBase}/what_do_you_like_to_do.wav`
        },
        {
          "description": "What do you like to do?",
          "translation": "Bạn thích làm gì?",
          "answer": "I like to feed my cat.",
          "answer_vi": "Tôi thích cho mèo của tôi ăn.",
          "audio": `${audioBase}/example4.wav`,
          "audio_question": `${audioBase}/what_do_you_like_to_do.wav`
        },
        {
          "description": "What do you like to do?",
          "translation": "Bạn thích làm gì?",
          "answer": "I like to give my dog a bath.",
          "answer_vi": "Tôi thích tắm cho con chó của tôi.",
          "audio": `${audioBase}/example5.wav`,
          "audio_question": `${audioBase}/what_do_you_like_to_do.wav`
        },
        {
          "description": "What do you like to do?",
          "translation": "Bạn thích làm gì?",
          "answer": "I like to hold hands with my friends.",
          "answer_vi": "Tôi thích nắm tay bạn bè của tôi.",
          "audio": `${audioBase}/example6.wav`,
          "audio_question": `${audioBase}/what_do_you_like_to_do.wav`
        }
      ]
    }
  ]
}
export const unit1SongDataTS: Unit1SongData = {
  "song_name": "Taking Care",
  "unit": "Unit 1 - Taking Care",
  "audio":`${audioBase}/taking_care_song.wav`,
  "type": "song",
  "lyrics": [
    "Taking Care ",
    "I love taking care of my pet.",
    "I love taking care of my family.",
    "I love taking care of them all.",
    "I'm happy that there are so many!",
    "",
    "I love taking care of my pets",
    "I love to pick them up, and hug them, too",
    "But before I get to play with my pets",
    "I have some work to do.",
    "",
    "I have to comb my cat, feed my dog,",
    "protect my bird,and pick up my frog",
    "I have to wash my goat, brush my horse",
    "And I can't forget to bathe my snake, of course.",
    "",
    "CHORUS",
    "",
    "I love taking care of my family",
    "I love to hug them, too.",
    "But before I get to play with my family",
    "I have some work to do.",
    "",
    "I have to read to my sister",
    "take are if mny brother",
    "and hold hands with my grandmother.",
    "I have to teach my brothers their 1,2,3's",
    "and carry my family's new baby.",
    "",
    "I love taking care of my pets",
    "I love taking care of my family.",
    "After all my word is done,",
    "I get to have some fun with my ...",   
    "cat and dog, bird and frog,",
    "goat and horse, and snake, of course!",
    "My sister and brother,my grandmother,",
    "and even my family's new baby!"
  ]
}


export const unit1Grammar1DataTS: Unit1Grammar1Data = {
  "slug": "unit1_grammar1",
  "title": "GRAMMAR 1 – Before and After",
  "sections": [
    {
      "slug": "before_and_after_examples",
      "title": "Before and After – Examples",
      "instruction": "Listen and read. Notice how we use 'before' and 'after'.",
       "examples": [
            {
            "sentence": "What does she do before breakfast?",
            "translation": "Cô ấy làm gì trước bữa sáng?",
            "audio": `${audioBase}/What_does_she_do_before_breakfast.wav`
            },
            {
            "sentence": "She gets dressed before breakfast.",
            "translation": "Cô ấy mặc quần áo trước bữa sáng.",
            "audio": `${audioBase}/She_gets_dressed_before_breakfast.wav`
            },
            {
            "sentence": "What does he do after school?",
            "translation": "Cậu ấy làm gì sau giờ học?",
            "audio": `${audioBase}/What_does_he_do_after_school.wav`
            },
            {
            "sentence": "He feeds his bird after school.",
            "translation": "Cậu ấy cho chim ăn sau giờ học.",
            "audio": `${audioBase}/He_feeds_his_bird_after_school.wav`
            }
        ]
    },
    {
      "slug": "look_at_pictures_complete",
      "section": "Look at the pictures. Complete the sentences.",
      "instruction": "Choose 'before' or 'after' to complete each sentence.",
      "images": [
            `${imageBase}/before_school_1.jpg`,
            `${imageBase}/before_school_2.jpg`,
            `${imageBase}/before_school_3.jpg`,
            `${imageBase}/after_school_1.jpg`,
            `${imageBase}/after_school_2.jpg`,
            `${imageBase}/after_school_3.jpg`
        ],
      "questions": [
            {
            "sentence": "He plays with his cat before/after school.",
            "answer": "after",
            "audio_answer": `${audioBase}/after.wav`
            },
            {
            "sentence": "He brushes his teeth before/after school.",
            "answer": "before",
            "audio_answer": `${audioBase}/before.wav`
            },
            {
            "sentence": "He helps his mom before/after school.",
            "answer": "after",
            "audio_answer": `${audioBase}/after.wav`
            },
            {
            "sentence": "He feeds his dog before/after school.",
            "answer": "after",
            "audio_answer": `${audioBase}/after.wav`
            },
            {
            "sentence": "He gets dressed before/after school.",
            "answer": "before",
            "audio_answer": `${audioBase}/before.wav`
            },
            {
            "sentence": "He plays basketball before/after school.",
            "answer": "after",
            "audio_answer": `${audioBase}/after.wav`
            }
        ]
    },
    {
      "slug": "write_before_after_school",
      "title": "Write about your day",
      "instruction": "Look at the pictures. Write what you do before and after school.",
      "table": {
        "columns": ["Before school", "After school"],
        "before_images": [
            `${imageBase}/before_school_table.jpg`,
            `${imageBase}/eat_breakfast.jpg`
        ],
        "after_images": [
            `${imageBase}/after_school_table.jpg`,
            `${imageBase}/play_with_pet.jpg`
        ],
        "rows": [
            { "before": "", "after": "" },
            { "before": "", "after": "" },
            { "before": "", "after": "" }
        ]
    }
    },
    {
      "slug": "ask_and_answer",
      "section": "Ask and Answer",
      "instruction": "Work with a partner. Ask and answer questions about what you do before and after school.",
      "vocabulary": ["bedtime", "breakfast", "dinner", "lunch", "school"],
      "examples": [
        {
            "question": "What do you do after breakfast?",
            "translation_question": "Bạn làm gì sau khi ăn sáng?",
            "answer": "I brush my teeth.",
            "translation_answer": "Tôi đánh răng trước "
        },
        {
            "question": "What do you do before bedtime?",
            "translation_question": "Bạn làm gì trước giờ ngủ?",
            "answer": "I help my mom.",
            "translation_answer": "Tôi giúp mẹ tôi."
        }
        ]
    }
  ]
};
export const unit1Vocabulary2DataTS: Unit1Vocabulary2Data = {
  "slug": "unit1_vocabulary2",
  "unit": "Unit 1 – Before and After",
  "title": "Vocabulary 2 – Daily Actions",
  "sections": [
    {
      "section": "Vocabulary Practice",
      "title": "Daily Routines",
      "instruction": "Listen and repeat each action. Then do the True or False exercise.",
      "vocabulary": [
        {
          "word": "take a shower",
          "translation": "tắm rửa",
          "audio": `${audioBase}/take_a_shower.wav`,
          "image": `${imageBase}/take_a_shower.jpg`
        },
        {
          "word": "make my bed",
          "translation": "dọn giường",
          "audio": `${audioBase}/make_my_bed.wav`,
          "image": `${imageBase}/make_my_bed.jpg`
        },
        {
          "word": "come home",
          "translation": "về nhà",
          "audio": `${audioBase}/come_home.wav`,
          "image": `${imageBase}/come_home.jpg`
        },
        {
          "word": "have a snack",
          "translation": "ăn nhẹ",
          "audio": `${audioBase}/have_a_snack.wav`,
          "image": `${imageBase}/have_a_snack.jpg`
        },
        {
          "word": "do my homework",
          "translation": "làm bài tập về nhà",
          "audio": `${audioBase}/do_my_homework.wav`,
          "image": `${imageBase}/do_my_homework.jpg`
        }
      ],
      "sentences": [
        {
          "sentence": "She makes her bed at eight fifteen.",
          "translation": "Cô ấy dọn giường lúc tám giờ mười lăm.",
          "answer": "T",
          "audio": `${audioBase}/She_makes_her_bed_at_815.wav`
        },
        {
          "sentence": "She has a snack at four forty-five.",
          "translation": "Cô ấy ăn nhẹ lúc bốn giờ bốn mươi lăm.",
          "answer": "T",
          "audio": `${audioBase}/She_has_a_snack_at_445.wav`
        },
        {
          "sentence": "She does her homework at five o'clock.",
          "translation": "Cô ấy làm bài tập lúc năm giờ.",
          "answer": "T",
          "audio": `${audioBase}/She_does_her_homework_at_5.wav`
        },
        {
          "sentence": "She takes a shower at six thirty.",
          "translation": "Cô ấy tắm lúc sáu giờ ba mươi.",
          "answer": "T",
          "audio": `${audioBase}/She_takes_a_shower_at_630.wav`
        },
        {
          "sentence": "She comes home at three twenty-five.",
          "translation": "Cô ấy về nhà lúc ba giờ hai mươi lăm.",
          "answer": "T",
          "audio": `${audioBase}/She_comes_home_at_325.wav`
        }
      ]
    }
  ]
};
export const unit1Grammar2DataTS: Unit1Grammar2Data = {
  "slug": "unit1_grammar2",
  "unit": "Unit 1 – Before and After",
  "title": "Grammar 2 – Adverbs of Frequency",
  "sections": [
    {
      "type": "Grammar",
      "section": "Grammar – Adverbs of Frequency",
      "instruction": "Listen and read. Adverbs of frequency tell how often we do something.",
      "examples": [
        {
          "sentence": "I never eat lunch at 12:30.",
          "translation": "Tôi không bao giờ ăn trưa lúc 12:30.",
          "audio": `${audioBase}/I_never_eat_lunch_at_1230.wav`
        },
        {
          "sentence": "I sometimes eat lunch at 12:30.",
          "translation": "Tôi thỉnh thoảng ăn trưa lúc 12:30.",
          "audio": `${audioBase}/I_sometimes_eat_lunch_at_1230.wav`
        },
        {
          "sentence": "I usually eat lunch at 12:30.",
          "translation": "Tôi thường ăn trưa lúc 12:30.",
          "audio": `${audioBase}/I_usually_eat_lunch_at_1230.wav`
        },
        {
          "sentence": "I always eat lunch at 12:30.",
          "translation": "Tôi luôn luôn ăn trưa lúc 12:30.",
          "audio": `${audioBase}/I_always_eat_lunch_at_1230.wav`
        }
      ]
    },
    {
      "type": "Writing",
      "section": "Read and Write – Complete the Sentences",
      "instruction": "Fill in the blanks with adverbs of frequency: always, usually, sometimes, or never.",
      "image": `${imageBase}/grammar2_read_write.jpg`,
      "questions": [
        {
          "sentence": "Meena I __ play soccer at 6:30.",
          "answer": "never",
          "audio": `${audioBase}/Meena_I_never_play_soccer.wav`
        },
        {
          "sentence": "Tom I __ take a shower at 8:15.",
          "answer": "always",
          "audio": `${audioBase}/Tom_I_always_take_a_shower.wav`
        },
        {
          "sentence": "Meena I __ help at home at 6:30.",
          "answer": "usually",
          "audio": `${audioBase}/Meena_I_usually_help_at_home.wav`
        },
        {
          "sentence": "Tom I __ go to bed at 8:45.",
          "answer": "usually",
          "audio": `${audioBase}/Tom_I_usually_go_to_bed.wav`
        },
        {
          "sentence": "Meena I __ take a shower at 8:15.",
          "answer": "sometimes",
          "audio": `${audioBase}/Meena_I_sometimes_take_a_shower.wav`
        }
      ]
    },
    {
      "type": "Speaking",
      "section": "Speaking – Talk About Your Routine",
      "instruction": "Listen and repeat. Then talk about your own routine using adverbs of frequency.",
      "examples": [
        {
            "sentence": "I usually make my bed in the morning.",
            "translation": "Tôi thường dọn giường vào buổi sáng.",
            "audio": `${audioBase}/I_usually_make_my_bed.wav`
        },
        {
            "sentence": "I always make my bed in the morning.",
            "translation": "Tôi luôn dọn giường vào buổi sáng.",
            "audio": `${audioBase}/I_always_make_my_bed.wav`
        },
        {
            "sentence": "So we're different.",
            "translation": "Vậy là chúng ta khác nhau.",
            "audio": `${audioBase}/So_were_different.wav`
        }
    ]
    }
  ]
};

export const unit1ReadingDataTS : Unit1ReadingData = {
  "slug": "unit1_reading",
  "title": "Unit 1 – Reading",
  "sections": [
    {
      "slug": "listen_and_read",
      "section": "Listen and read",
      "type": "Reading",
      "instruction": "Listen and read about how people care for baby elephants.",
      "image": `${imageBase}/baby_elephants.jpg`,
      "content": [
        {
          "sentence": "Caring for Baby Elephants",
          "translation": "Chăm sóc những chú voi con",
          "audio": `${audioBase}/Caring_for_Baby_Elephants.wav`
        },
        {
          "sentence": "Sometimes young animals such as elephants don't have parents to take care of them.",
          "translation": "Đôi khi những con vật non như voi không có cha mẹ để chăm sóc chúng.",
          "audio": `${audioBase}/Sometimes_young_animals.wav`
        },
        {
          "sentence": "Who can help them?",
          "translation": "Ai có thể giúp chúng?",
          "audio": `${audioBase}/Who_can_help_them.wav`
        },
        {
          "sentence": "A group called the David Sheldrick Wildlife Trust helps elephants and other animals in Kenya, in Africa.",
          "translation": "Một tổ chức có tên là David Sheldrick Wildlife Trust giúp đỡ các loài voi và động vật khác ở Kenya, châu Phi.",
          "audio": `${audioBase}/A_group_called_David_Sheldrick.wav`
        },
        {
          "sentence": "Sometimes, a baby elephant's mother dies. When that happens, the baby doesn't have anyone to take care of it, or any milk to drink.",
          "translation": "Đôi khi mẹ của một chú voi con chết. Khi điều đó xảy ra, voi con không còn ai chăm sóc và cũng không có sữa để uống.",
          "audio": `${audioBase}/Sometimes_a_baby_elephant.wav`
        },
        {
          "sentence": "People at the Sheldrick Wildlife Trust find the baby elephant and care for it. They feed it milk and protect it.",
          "translation": "Những người trong tổ chức Sheldrick Wildlife Trust tìm thấy voi con và chăm sóc nó. Họ cho nó uống sữa và bảo vệ nó.",
          "audio": `${audioBase}/People_at_the_Sheldrick.wav`
        },
        {
          "sentence": "The baby elephants are usually sad at first.",
          "translation": "Những chú voi con thường buồn bã lúc đầu.",
          "audio": `${audioBase}/The_baby_elephants_are_usually_sad.wav`
        },
        {
          "sentence": "They don't want to eat or sleep.",
          "translation": "Chúng không muốn ăn hoặc ngủ.",
          "audio": `${audioBase}/They_dont_want_to_eat.wav`
        },
        {
          "sentence": "People at the Trust take turns caring for the baby elephant.",
          "translation": "Những người trong tổ chức thay phiên nhau chăm sóc voi con.",
          "audio": `${audioBase}/People_at_the_Trust_take_turns.wav`
        },
        {
          "sentence": "They sleep near it and give it milk when it's hungry.",
          "translation": "Họ ngủ gần nó và cho nó uống sữa khi nó đói.",
          "audio": `${audioBase}/They_sleep_near_it.wav`
        },
        {
          "sentence": "The people are like the elephant's new family.",
          "translation": "Những người đó giống như gia đình mới của chú voi con.",
          "audio": `${audioBase}/The_people_are_like_new_family.wav`
        },
        {
          "sentence": "After a few weeks, the baby elephant starts to play and make friends with other elephants.",
          "translation": "Sau vài tuần, chú voi con bắt đầu chơi đùa và kết bạn với những con voi khác.",
          "audio": `${audioBase}/After_a_few_weeks.wav`
        },
        {
          "sentence": "Now the people at the Trust know that the elephant is happy.",
          "translation": "Bây giờ, những người trong tổ chức biết rằng chú voi con đã hạnh phúc.",
          "audio": `${audioBase}/Now_the_people_know_elephant_is_happy.wav`
        },
        {
          "sentence": "In time, the elephant is ready to go back to the wild to live with other elephants!",
          "translation": "Đến lúc, chú voi con đã sẵn sàng trở lại thiên nhiên để sống cùng những con voi khác!",
          "audio": `${audioBase}/In_time_the_elephant_is_ready.wav`
        }
      ]
    },
    {
      "slug": "check_true_false",
      "section": "Read. Check T for True and F for False",
      "type": "ReadingComprehension",
      "instruction": "Read the sentences and check T (True) or F (False).",
      "questions": [
        {
          "sentence": "The David Sheldrick Wildlife Trust helps animals in Asia.",
          "translation": "Tổ chức David Sheldrick Wildlife Trust giúp động vật ở châu Á.",
          "answer": "F"
        },
        {
          "sentence": "The Trust helps elephants and other animals.",
          "translation": "Tổ chức giúp đỡ những con voi và các loài động vật khác.",
          "answer": "T"
        },
        {
          "sentence": "Sometimes a baby elephant's mother dies.",
          "translation": "Đôi khi mẹ của một chú voi con chết.",
          "answer": "T"
        },
        {
          "sentence": "People at the Trust give milk to the baby elephants.",
          "translation": "Những người trong tổ chức cho voi con uống sữa.",
          "answer": "T"
        },
        {
          "sentence": "The elephants never go back to the wild.",
          "translation": "Những con voi không bao giờ quay lại tự nhiên.",
          "answer": "F"
        }
      ]
    },
    {
      "slug": "number_the_sentences",
      "section": "Read. Number the sentences in order",
      "type": "Ordering",
      "instruction": "Read the sentences. Number them in the correct order (1–5).",
      "sentences": [
        {
          "sentence": "People at the Trust find the baby elephant.",
          "translation": "Những người trong tổ chức tìm thấy chú voi con.",
          "order": 2
        },
        {
          "sentence": "The elephant goes back to the wild.",
          "translation": "Chú voi trở lại tự nhiên.",
          "order": 5
        },
        {
          "sentence": "People at the Trust give the baby elephant milk.",
          "translation": "Những người trong tổ chức cho voi con uống sữa.",
          "order": 3
        },
        {
          "sentence": "The baby elephant's mother dies.",
          "translation": "Mẹ của chú voi con chết.",
          "order": 1
        },
        {
          "sentence": "The elephant grows and plays with other elephants.",
          "translation": "Chú voi lớn lên và chơi đùa với những con voi khác.",
          "order": 4
        }
      ]
    },
    {
      "slug": "talk_about_the_reading",
      "section": "Talk about the reading",
      "type": "Speaking",
      "instruction": "Work with a partner. Talk about what you learned from the reading.",
      "examples": [
        {
          "sentence": "The baby elephants need help.",
          "translation": "Những chú voi con cần được giúp đỡ.",
          "audio": `${audioBase}/The_baby_elephants_need_help.wav`
        },
        {
          "sentence": "That's why the people at the Trust take care of them.",
          "translation": "Đó là lý do tại sao những người trong tổ chức chăm sóc chúng.",
          "audio": `${audioBase}/Thats_why_the_people_take_care.wav`
        }
      ]
    }
  ]
};
export const unit1WritingDataTS :Unit1WritingData = {
  "slug": "unit1_writing",
  "title": "Unit 1 – Writing",
  "sections": [
    {
      "slug": "read_about_a_zookeeper_day",
      "section": "Read",
      "type": "Reading",
      "title": "Read. We can use the word 'and' to connect two ideas. Underline the sentences with 'and' as you read.",
      "title_vi": "Đọc. Chúng ta có thể dùng từ 'and' để nối hai ý. Gạch chân các câu có từ 'and' khi bạn đọc.",
      "content": [
        {
          "sentence": "A Zookeeper's Day",
          "translation": "Một ngày của người chăm sóc sở thú",
          "audio": `${audioBase}/a_zookeepers_day.wav`,
          "images": [
            `${imageBase}/zookeeper_day_1.jpg`,
            `${imageBase}/zookeeper_day_2.jpg`
          ]
        },
        {
          "sentence": "My uncle is a zookeeper.",
          "translation": "Chú tôi là người chăm sóc sở thú.",
          "audio": `${audioBase}/my_uncle_is_a_zookeeper.wav`
        },
        {
          "sentence": "He takes care of some of the monkeys in the zoo.",
          "translation": "Chú chăm sóc một vài con khỉ trong sở thú.",
          "audio": `${audioBase}/he_takes_care_of_monkeys.wav`
        },
        {
          "sentence": "He gets up at 6:30 every morning.",
          "translation": "Chú ấy thức dậy lúc 6 giờ 30 mỗi sáng.",
          "audio": `${audioBase}/he_gets_up_at_630.wav`
        },
        {
          "sentence": "There are more than 60 monkeys, so there's a lot of food!",
          "translation": "Có hơn 60 con khỉ, nên có rất nhiều thức ăn!",
          "audio": `${audioBase}/there_are_more_than_60_monkeys.wav`
        },
        {
          "sentence": "The monkeys eat vegetables, fruits, and special monkey food.",
          "translation": "Những con khỉ ăn rau củ, trái cây và thức ăn đặc biệt dành cho khỉ.",
          "audio": `${audioBase}/the_monkeys_eat_vegetables.wav`
        },
        {
          "sentence": "Before lunch my uncle usually cleans the monkey house.",
          "translation": "Trước bữa trưa, chú tôi thường dọn dẹp chuồng khỉ.",
          "audio": `${audioBase}/before_lunch_my_uncle_cleans.wav`
        },
        {
          "sentence": "It's hard work!",
          "translation": "Đó là một công việc vất vả!",
          "audio": `${audioBase}/its_hard_work.wav`
        },
        {
          "sentence": "In the afternoon he feeds the monkeys again.",
          "translation": "Buổi chiều, chú ấy cho khỉ ăn lần nữa.",
          "audio": `${audioBase}/in_the_afternoon_he_feeds.wav`
        },
        {
          "sentence": "Sometimes he talks to the visitors at the zoo.",
          "translation": "Đôi khi chú ấy nói chuyện với khách tham quan ở sở thú.",
          "audio": `${audioBase}/sometimes_he_talks_to_visitors.wav`
        },
        {
          "sentence": "He loves his job.",
          "translation": "Chú ấy yêu công việc của mình.",
          "audio": `${audioBase}/he_loves_his_job.wav`
        },
        {
          "sentence": "And I love to visit him at the zoo!",
          "translation": "Và tôi rất thích đến thăm chú ở sở thú!",
          "audio": `${audioBase}/i_love_to_visit_him.wav`
        }
      ]
    },
    {
      "slug": "write_about_someone",
      "section": "Write",
      "type": "Writing",
      "title": "Describe someone who takes care of animals.",
      "title_vi": "Miêu tả một người chăm sóc động vật.",
      "instruction": "Think about someone who takes care of animals or people. Write about his or her day.",
      "instruction_vi": "Hãy nghĩ về một người chăm sóc động vật hoặc con người. Viết về một ngày của họ.",
      "input": {
        "placeholder": "Write your paragraph here...",
        "placeholder_vi": "Viết đoạn văn của bạn vào đây..."
      }
    },
    {
      "slug": "share_your_writing",
      "section": "Share",
      "type": "Speaking",
      "title": "Share your writing. Work in a small group. Listen and fill in the chart.",
      "title_vi": "Chia sẻ bài viết của bạn. Làm việc theo nhóm nhỏ. Lắng nghe và điền vào bảng.",
      "table": {
        "columns": [
          "Name",
          "Who?",
          "What does he or she do?"
        ],
        "columns_vi": [
          "Tên",
          "Người đó là ai?",
          "Người đó làm gì?"
        ],
        "rows": [
          ["", "", ""],
          ["", "", ""]
        ]
      }
    }
  ]
};
