import {
 Unit5Data,
 AnimalHabitatsQAItem,
 Unit5WorkbookVocabSection,
 Unit5WorkbookSection
} from "./type";
const audioBase = "https://raw.githubusercontent.com/klamts/Unit5_Animal_Habitats/main";
const imageBase = "https://raw.githubusercontent.com/klamts/images/main";
export const unit5Vocabulary1DataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
                    {
                      "slug": "vocabulary1",
                      "section": "Vocabulary 1",
                      "title": "Animal Habitats Vocabulary",
                      "type": "Vocabulary",
                      "instruction": "Learn these words about animal habitats. Listen, repeat, check their pronunciation, and look at the pictures.",
                      "content": [
                        {
                          "word": "wetlands",
                          "pronunciation": "/ˈwet.lændz/",
                          "meaning": "vùng đất ngập nước",
                          "example": "Many birds live in wetlands.",
                          "audio": `${audioBase}/wetlands.wav`,
                          "image": `${imageBase}/wetlands.jpg`
                        },
                        {
                          "word": "grasslands",
                          "pronunciation": "/ˈɡræs.lændz/",
                          "meaning": "đồng cỏ",
                          "example": "Grasslands are home to many herbivores.",
                          "audio": `${audioBase}/grasslands.wav`,
                          "image": `${imageBase}/grasslands.jpg`
                        },
                        {
                          "word": "a forest",
                          "pronunciation": "/ə ˈfɒr.ɪst/",
                          "meaning": "một khu rừng",
                          "example": "A forest provides shelter for wildlife.",
                          "audio": `${audioBase}/a_forest.wav`,
                          "image": `${imageBase}/a_forest.jpg`
                        },
                        {
                          "word": "a rain forest",
                          "pronunciation": "/ə ˈreɪn ˌfɒr.ɪst/",
                          "meaning": "một khu rừng mưa",
                          "example": "Rain forests have high biodiversity.",
                          "audio": `${audioBase}/a_rain_forest.wav`,
                          "image": `${imageBase}/a_rain_forest.jpg`
                        },
                        {
                          "word": "ice",
                          "pronunciation": "/aɪs/",
                          "meaning": "băng",
                          "example": "Polar bears live on ice.",
                          "audio": `${audioBase}/ice.wav`,
                          "image": `${imageBase}/ice.jpg`
                        },
                        {
                          "word": "a web",
                          "pronunciation": "/ə wɛb/",
                          "meaning": "mạng nhện",
                          "example": "Spiders spin a web to catch insects.",
                          "audio": `${audioBase}/a_web.wav`,
                          "image": `${imageBase}/a_web.jpg`
                        },
                        {
                          "word": "underground",
                          "pronunciation": "/ˌʌn.dəˈɡraʊnd/",
                          "meaning": "dưới đất",
                          "example": "Moles live underground.",
                          "audio": `${audioBase}/underground.wav`,
                          "image": `${imageBase}/underground.jpg`
                        },
                        {
                          "word": "snow",
                          "pronunciation": "/snoʊ/",
                          "meaning": "tuyết",
                          "example": "Penguins live in areas with snow.",
                          "audio": `${audioBase}/snow.wav`,
                          "image": `${imageBase}/snow.jpg`
                        },
                        {
                          "word": "mud",
                          "pronunciation": "/mʌd/",
                          "meaning": "bùn",
                          "example": "Frogs hide in mud to stay cool.",
                          "audio": `${audioBase}/mud.wav`,
                          "image": `${imageBase}/mud.jpg`
                        },
                        {
                          "word": "a hive",
                          "pronunciation": "/ə haɪv/",
                          "meaning": "tổ ong",
                          "example": "Bees live in a hive.",
                          "audio": `${audioBase}/a_hive.wav`,
                          "image": `${imageBase}/a_hive.jpg`
                        },
                        {
                          "word": "a nest",
                          "pronunciation": "/ə nɛst/",
                          "meaning": "tổ chim",
                          "example": "Birds build a nest to lay eggs.",
                          "audio": `${audioBase}/a_nest.wav`,
                          "image": `${imageBase}/a_nest.jpg`
                        },
                        {
                          "word": "an island",
                          "pronunciation": "/ən ˈaɪ.lənd/",
                          "meaning": "một hòn đảo",
                          "example": "Some animals live only on a specific island.",
                          "audio": `${audioBase}/an_island.wav`,
                          "image": `${imageBase}/an_island.jpg`
                        },
                        {
                          "word": "a cave",
                          "pronunciation": "/ə keɪv/",
                          "meaning": "một hang động",
                          "example": "Bats live in caves.",
                          "audio": `${audioBase}/a_cave.wav`,
                          "image": `${imageBase}/a_cave.jpg`
                        },
                        {
                          "word": "a desert",
                          "pronunciation": "/ə ˈdez.ɚt/",
                          "meaning": "một sa mạc",
                          "example": "Camels can survive in a desert.",
                          "audio": `${audioBase}/a_desert.wav`,
                          "image": `${imageBase}/a_desert.jpg`
                        }
                      ]
                    },
    {
      "slug": "work_with_partner",
      "section": "Work with a partner",
      "title": "Ask and Answer",
      "type": "Q&A",
      "instruction": "Ask your partner the questions and answer using the correct habitat. Look at the picture to help.",
      "content": [
        {
          "question": "Where do camels live?",
          "answer": "They live in the desert.",
          "related_vocab": [
            "a desert"
          ],
          "image": `${imageBase}/a_desert.jpg`,
          "audio_question": `${audioBase}/q_Where_do_camels_live.wav`,
          "audio_answer": `${audioBase}/a_They_live_in_the_desert.wav`
        },
        {
          "question": "Where do penguins live?",
          "answer": "They live in areas with snow.",
          "related_vocab": [
            "snow"
          ],
          "image": `${imageBase}/snowpenguins.jpg`,
          "audio_question": `${audioBase}/q_Where_do_penguins_live.wav`,
          "audio_answer": `${audioBase}/a_They_live_in_areas_with_snow.wav`
        },
        {
          "question": "Where do bees live?",
          "answer": "They live in a hive.",
          "related_vocab": [
            "a hive"
          ],
          "image": `${imageBase}/a_hive_bees.jpg`,
          "audio_question": `${audioBase}/q_Where_do_bees_live.wav`,
          "audio_answer": `${audioBase}/a_They_live_in_a_hive.wav`
        },
        {
          "question": "Where do birds live?",
          "answer": "They live in a nest.",
          "related_vocab": [
            "a nest"
          ],
          "image": `${imageBase}/a_nest_birds.jpg`,
          "audio_question": `${audioBase}/q_Where_do_birds_live.wav`,
          "audio_answer": `${audioBase}/a_They_live_in_a_nest.wav`
        },
        {
          "question": "Where do bats live?",
          "answer": "They live in caves.",
          "related_vocab": [
            "a cave"
          ],
          "image": `${imageBase}/a_cave_bats.jpg`,
          "audio_question": `${audioBase}/q_Where_do_bats_live.wav`,
          "audio_answer": `${audioBase}/a_They_live_in_caves.wav`
        }
      ]
    }
  ]
}
export const unit5Grammar1DataTS: Unit5Data ={
      "slug": "grammar1",
      "type": "Grammar",
      "title": "Grammar 1",
      "instruction": "Learn how to use Why...? Because...",
      "examples": [
        {
          "question": "**Why** does a giraffe have a long neck?",
          "answer": "**Because** it eats leaves at the top of trees.",
          "audio_question": `${audioBase}/q_Why_does_a_giraffe_have_a_long_neck.wav`,
          "audio_answer": `${audioBase}/a_Because_it_eats_leaves_at_the_top_of_trees.wav`
        },
        {
          "question": "**Why** don't you like penguins?",
          "answer": "**Because** they look silly, and they can't fly!",
          "audio_question": `${audioBase}/q_Why_don't_you_like_penguins.wav`,
          "audio_answer": `${audioBase}/a_Because_they_look_silly.wav`
        }
      ]
    }
export const unit5SongDataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "unit": "Unit 5",
  "title": "Animal Habitats",
  "sections": [
    {
      "slug": "listen_read_and_sing",
      "type": "Song",
      "title": "Listen, Read and Sing",
      "song_title": "Why? Because!",
      "song_audio": `${audioBase}/unit5_song_why_because.wav`,
      "lyrics": [
        "Why? Because!",
        "Why does a giraffe have a long, long neck?",
        "Why? Why? Because it eats leaves at the tops of the trees.",
        "I want to know why. I want to know why.",
        "Why? Because I want to know why!",
        "",
        "Why does a frog have strong legs?",
        "Why? Why? Because it hops, swims, and jumps.",
        "",
        "CHORUS",
        "Animals are amazing. They do so many things.",
        "And I have just one thing to say.",
        "Why?",
        "",
        "Why does a polar bear have white fur?",
        "Why? Why? Because it lives in ice and snow."
      ]
    },
    {
      "slug": "act_out_and_describe",
      "type": "Activity",
      "title": "Act out and describe an animal",
      "instruction": "Work with a group. Your group guesses the animal. Take turns."
    }
  ]
}
export const unit5Vocabulary2DataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "vocabulary2",
      "section": "Vocabulary 2",
      "title": "Animal Body Parts Vocabulary",
      "type": "Vocabulary",
      "instruction": "Learn these words about animal body parts. Listen, repeat, check their pronunciation and meaning.",
      "content": [
        {
          "word": "tongue",
          "pronunciation": "/tʌŋ/",
          "meaning": "lưỡi",
          "example": "A giraffe has a long **tongue**.",
          "audio_word": `${audioBase}/tongue_word.wav`,
          "audio_example": `${audioBase}/tongue_example.wav`,
          "image": `${imageBase}/tongue_giraffe.jpg`
        },
        {
          "word": "fur",
          "pronunciation": "/fɜːr/",
          "meaning": "lông (dày, mềm của động vật có vú)",
          "example": "A polar bear has thick white **fur**.",
          "audio_word": `${audioBase}/fur_word.wav`,
          "audio_example": `${audioBase}/fur_example.wav`,
          "image": `${imageBase}/fur_polarbear.jpg`
        },
        {
          "word": "horns",
          "pronunciation": "/hɔːrnz/",
          "meaning": "sừng",
          "example": "A goat has two **horns**.",
          "audio_word": `${audioBase}/horns_word.wav`,
          "audio_example": `${audioBase}/horns_example.wav`,
          "image":`${imageBase}/horns_goat.jpg`
        },
        {
          "word": "pouch",
          "pronunciation": "/paʊtʃ/",
          "meaning": "túi (của thú có túi)",
          "example": "A kangaroo has a **pouch**.",
          "audio_word": `${audioBase}/pouch_word.wav`,
          "audio_example": `${audioBase}/pouch_example.wav`,
          "image": `${imageBase}/pouch_kangaroo.jpg`
        },
        {
          "word": "wings",
          "pronunciation": "/wɪŋz/",
          "meaning": "cánh",
          "example": "A parrot has colorful **wings**.",
          "audio_word": `${audioBase}/wings_word.wav`,
          "audio_example": `${audioBase}/wings_example.wav`,
          "image": `${imageBase}/wings_parrot.jpg`
        }
      ]
    },
    {
      "slug": "drag_drop_animals",
      "section": "Drag and Drop",
      "type": "Activity",
      "title": "Match animals with their body parts",
      "instruction": "Drag each animal into the correct column (pouch, fur, wings, horns).",
      "categories": [
        {
          "key": "pouch",
          "label": "Pouch",
          "audio_intro": `${audioBase}/pouch_word.wav`
        },
        {
          "key": "fur",
          "label": "Fur",
          "audio_intro": `${audioBase}/fur_word.wav`
        },
        {
          "key": "wings",
          "label": "Wings",
          "audio_intro": `${audioBase}/wings_word.wav`
        },
        {
          "key": "horns",
          "label": "Horns",
          "audio_intro": `${audioBase}/horns_word.wav`,
        }
      ],
      "items": [
        {
          "word": "butterfly",
          "correctCategory": "wings",
          "image": `${imageBase}/butterfly.jpg`,
          "audio_sentence": `${audioBase}/butterfly_sentence.wav`,
          "sentence": "The butterfly has wings."
        },
        {
          "word": "cat",
          "correctCategory": "fur",
          "image": `${imageBase}/cat.jpg`,
          "audio_sentence": `${audioBase}/cat_sentence.wav`,
          "sentence": "The cat has fur."
        },
        {
          "word": "duck",
          "correctCategory": "wings",
          "image": `${imageBase}/duck.jpg`,
          "audio_sentence": `${audioBase}/duck_sentence.wav`,
          "sentence": "The duck has wings."
        },
        {
          "word": "goat",
          "correctCategory": "horns",
          "image": `${imageBase}/goat.jpg`,
          "audio_sentence": `${audioBase}/goat_sentence.wav`,
          "sentence": "The goat has horns."
        },
        {
          "word": "kangaroo",
          "correctCategory": "pouch",
          "image": `${imageBase}/kangaroo.jpg`,
          "audio_sentence": `${audioBase}/kangaroo_sentence.wav`,
          "sentence": "The kangaroo has a pouch."
        },
        {
          "word": "monkey",
          "correctCategory": "fur",
          "image": `${imageBase}/monkey.jpg`,
          "audio_sentence": `${audioBase}/monkey_sentence.wav`,
          "sentence": "The monkey has fur."
        },
        {
          "word": "parrot",
          "correctCategory": "wings",
          "image": `${imageBase}/parrot.jpg`,
          "audio_sentence": `${audioBase}/parrot_sentence.wav`,
          "sentence": "The parrot has wings."
        },
        {
          "word": "penguin",
          "correctCategory": "wings",
          "image": `${imageBase}/penguin.jpg`,
          "audio_sentence": `${audioBase}/penguin_sentence.wav`,
          "sentence": "The penguin has wings."
        },
        {
          "word": "polar bear",
          "correctCategory": "fur",
          "image": `${imageBase}/polarbear.jpg`,
          "audio_sentence": `${audioBase}/polarbear_sentence.wav`,
          "sentence": "The polar bear has fur."
        },
        {
          "word": "rabbit",
          "correctCategory": "fur",
          "image": `${imageBase}/rabbit.jpg`,
          "audio_sentence": `${audioBase}/rabbit_sentence.wav`,
          "sentence": "The rabbit has fur."
        }
      ]
    }
  ]
}
export const unit5GrammarMatchDataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "unit": "Unit 5",
  "sections": [
    {
      "slug": "match",
      "type": "Match",
      "title": "Animal Features",
      "instruction": "Match the questions with the answers.",
      "questions": [
        {
          "q": "Why do jaguars have spots?",
          "q_vi": "Tại sao báo đốm có những đốm trên da?",
          "a": "Because they need to hide in the trees.",
          "a_vi": "Bởi vì chúng cần ẩn mình trên cây.",
          "audio_q": `${audioBase}/q1jaguars.wav`,
          "audio_a": `${audioBase}/a1jaguars.wav`,
          "image": `${imageBase}/jaguar_spots.jpg`
        },
        {
          "q": "Why does a polar bear cover its black nose?",
          "q_vi": "Tại sao gấu Bắc Cực che mũi đen của nó?",
          "a": "Because it wants to hide in the snow.",
          "a_vi": "Bởi vì nó muốn ẩn mình trong tuyết.",
          "audio_q": `${audioBase}/q2bear.wav`,
          "audio_a": `${audioBase}/a2bear.wav`,
          "image": `${imageBase}/polarbear_nose.jpg`
        },
        {
          "q": "Why do crocodiles have sharp teeth?",
          "q_vi": "Tại sao cá sấu có răng nhọn?",
          "a": "Because they eat meat.",
          "a_vi": "Bởi vì chúng ăn thịt.",
          "audio_q": `${audioBase}/q3crocodiles.wav`,
          "audio_a": `${audioBase}/a3crocodiles.wav`,
          "image": `${imageBase}/crocodile_teeth.jpg`
        },
        {
          "q": "Why does an owl have big eyes?",
          "q_vi": "Tại sao con cú có đôi mắt to?",
          "a": "Because it needs to see at night.",
          "a_vi": "Bởi vì nó cần nhìn vào ban đêm.",
          "audio_q": `${audioBase}/q4owl.wav`,
          "audio_a": `${audioBase}/a4owl.wav`,
          "image": `${imageBase}/owl_eyes.jpg`
        },
        {
          "q": "Why does an ostrich have long legs?",
          "q_vi": "Tại sao đà điểu có đôi chân dài?",
          "a": "Because it can't fly, and it needs to run fast.",
          "a_vi": "Bởi vì nó không thể bay, và nó cần chạy nhanh.",
          "audio_q": `${audioBase}/q5ostrich.wav`,
          "audio_a": `${audioBase}/a5ostrich.wav`,
          "image": `${imageBase}/ostrich_legs.jpg`
        }
      ]
    }
  ]
}
export const unit5Grammar2DataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "grammar2",
      "section": "Grammar 2",
      "title": "Infinitive of Purpose",
      "type": "Grammar",
      "instruction": "Learn how to use infinitives of purpose. Read the examples, listen and repeat.",
      "examples": [
        {
          "sentence": "Giraffes use their long tongues **to clean** their ears.",
          "translation": "Hươu cao cổ dùng chiếc lưỡi dài của chúng để làm sạch tai.",
          "audio": `${audioBase}/giraffes_use_tongues.wav`,
          "image": `${imageBase}/giraffe_tongue.jpg`
        },
        {
          "sentence": "Goats use their horns **to fight**.",
          "translation": "Dê dùng sừng của chúng để chiến đấu.",
          "audio": `${audioBase}/goats_use_horns.wav`,
          "image": `${imageBase}/goat_horns.jpg`
        }
      ]
    },
    {
      "slug": "read_and_match",
      "section": "Read and Match",
      "type": "Activity",
      "title": "Read and match. Then say in pairs.",
      "instruction": "Match the animals with their purposes. Then practice saying the full sentences in pairs.",
      "questions": [
        {
          "left": {
            "text": "Zebras use their black and white fur",
            "audio": `${audioBase}/zebra_left.wav`
          },
          "right": {
            "text": "to hide in the grasslands.",
            "audio": `${audioBase}/zebra_right.wav`
          },
          "sentence": "Zebras use their black and white fur to hide in the grasslands.",
          "meaning": "Ngựa vằn dùng bộ lông đen trắng của chúng để ẩn mình trong đồng cỏ."
        },
        {
          "left": {
            "text": "Cats use their tongues",
            "audio": `${audioBase}/cat_left.wav`
          },
          "right": {
            "text": "to clean their fur.",
            "audio": `${audioBase}/cat_right.wav`
          },
          "sentence": "Cats use their tongues to clean their fur.",
          "meaning": "Mèo dùng lưỡi của chúng để liếm sạch bộ lông."
        },
        {
          "left": {
            "text": "Kangaroos use their pouches",
            "audio": `${audioBase}/kangaroo_left.wav`
          },
          "right": {
            "text": "to carry their babies.",
            "audio": `${audioBase}/kangaroo_right.wav`
          },
          "sentence": "Kangaroos use their pouches to carry their babies.",
          "meaning": "Chuột túi dùng túi của chúng để mang theo con non."
        },
        {
          "left": {
            "text": "Elephants use their long trunks",
            "audio": `${audioBase}/elephant_left.wav`
          },
          "right": {
            "text": "to shower.",
            "audio": `${audioBase}/elephant_right.wav`
          },
          "sentence": "Elephants use their long trunks to shower.",
          "meaning": "Voi dùng vòi dài của chúng để tắm."
        },
        {
          "left": {
            "text": "Tigers use their sharp teeth",
            "audio": `${audioBase}/tiger_left.wav`
          },
          "right": {
            "text": "to eat meat.",
            "audio": `${audioBase}/tiger_right.wav`
          },
          "sentence": "Tigers use their sharp teeth to eat meat.",
          "meaning": "Hổ dùng răng sắc nhọn của chúng để ăn thịt."
        },
        {
          "left": {
            "text": "Penguins use their wings",
            "audio": `${audioBase}/penguin_left.wav`
          },
          "right": {
            "text": "to swim in the ocean.",
            "audio": `${audioBase}/penguin_right.wav`
          },
          "sentence": "Penguins use their wings to swim in the ocean.",
          "meaning": "Chim cánh cụt dùng cánh của chúng để bơi trong đại dương."
        }
      ]
    },
    {
      "slug": "dice_animals_parts",
      "section": "Dice Animals & Body Parts",
      "type": "Activity",
      "title": "Roll the dice and match animals with their body parts",
      "instruction": "Roll the animal dice and the body part dice. Say the sentence: 'The [animal] has [body part].'",
      "dice": [
        {
          "key": "animal",
          "label": "Animal Dice",
          "faces": [
            {
              "word": "kangaroo",
              "image": `${imageBase}/kangaroo.jpg`,
              "audio": `${audioBase}/kangaroo.wav`
            },
            {
              "word": "parrot",
              "image": `${imageBase}/parrot.jpg`,
              "audio": `${audioBase}/parrot.wav`
            },
            {
              "word": "crocodile",
              "image": `${imageBase}/crocodile.jpg`,
              "audio": `${audioBase}/crocodile.wav`
            },
            {
              "word": "dog",
              "image": `${imageBase}/dog.jpg`,
              "audio": `${audioBase}/dog.wav`
            },
            {
              "word": "elephant",
              "image": `${imageBase}/elephant.jpg`,
              "audio": `${audioBase}/elephant.wav`
            },
            {
              "word": "tiger",
              "image": `${imageBase}/tiger.jpg`,
              "audio": `${audioBase}/tiger.wav`
            }
          ]
        },
        {
          "key": "body_part",
          "label": "Body Part Dice",
          "faces": [
            {
              "word": "pouch",
              "image": `${imageBase}/pouch_kangaroo.jpg`,
              "audio": `${audioBase}/pouch.wav`
            },
            {
              "word": "teeth",
              "image": `${imageBase}/teeth_tiger.jpg`,
              "audio": `${audioBase}/teeth.wav`
            },
            {
              "word": "tail",
              "image": `${imageBase}/tail_dog.jpg`,
              "audio": `${audioBase}/tail.wav`
            },
            {
              "word": "tongue",
              "image": `${imageBase}/tongue_giraffe.jpg`,
              "audio": `${audioBase}/tongue.wav`
            },
            {
              "word": "trunk",
              "image": `${imageBase}/trunk_elephant.jpg`,
              "audio": `${audioBase}/trunk.wav`
            },
            {
              "word": "wings",
              "image": `${imageBase}/wings_parrot.jpg`,
              "audio": `${audioBase}/wings.wav`
            }
          ]
        }
      ]
    }
  ]
}
export const unit5ReadingDataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "listen_and_read",
      "section": "Listen and Read",
      "title": "READING",
      "type": "Listen and Read",
      "instruction": "Listen and read the passage about rain forests. Look at the pictures to understand better.",
      "paragraphs": [
        {
          "title": "Amazing Rain Forests",
          "sentences": [
            {
              "text": "Rain forests are warm, wet forests.",
              "translation": "Rừng mưa là những khu rừng ấm, ẩm ướt.",
              "audio": `${audioBase}/rainforests_are_warm.wav`
            },
            {
              "text": "They are in countries near the equator - in Central America, South America, Africa, Southeast Asia, and Australia.",
              "translation": "Chúng nằm ở các quốc gia gần xích đạo - ở Trung Mỹ, Nam Mỹ, Châu Phi, Đông Nam Á và Úc.",
              "audio": `${audioBase}/rainforests_location.wav`
            },
            {
              "text": "Rain forests are important.",
              "translation": "Rừng mưa rất quan trọng.",
              "audio": `${audioBase}/rainforests_important.wav`
            },
            {
              "text": "They're homes for millions of animals and plants.",
              "translation": "Chúng là nơi sinh sống của hàng triệu loài động vật và thực vật.",
              "audio": `${audioBase}/rainforests_homes.wav`
            },
            {
              "text": "The plants in rain forests make much of the oxygen that people in the world need to live.",
              "translation": "Các cây trong rừng mưa tạo ra phần lớn oxy mà con người trên thế giới cần để sống.",
              "audio": `${audioBase}/rainforests_oxygen.wav`
            }
          ]
        },
        {
          "title": "A Rain Forest Has Four Parts",
          "paragraphs": [
            {
              "title": "Emergent",
              "image": `${imageBase}/rf_emergent.jpg`,
              "sentences": [
                {
                  "text": "In this part, you can see the tops of very tall trees.",
                  "translation": "Ở phần này, bạn có thể nhìn thấy ngọn của những cây rất cao.",
                  "audio": `${audioBase}/emergent_trees.wav`
                },
                {
                  "text": "They are sometimes 60m (200ft.) tall!",
                  "translation": "Chúng đôi khi cao tới 60m (200ft)!",
                  "audio": `${audioBase}/emergent_height.wav`
                },
                {
                  "text": "Many different birds, butterflies, and other insects live here.",
                  "translation": "Nhiều loài chim, bướm và côn trùng khác sống ở đây.",
                  "audio": `${audioBase}/emergent_animals.wav`
                }
              ]
            },
            {
              "title": "Canopy",
              "image": `${imageBase}/rf_canopy.jpg`,
              "sentences": [
                {
                  "text": "In this part of the forest, the trees have many leaves.",
                  "translation": "Ở phần này của rừng, các cây có rất nhiều lá.",
                  "audio": `${audioBase}/canopy_leaves.wav`
                },
                {
                  "text": "Birds, spiders, tree frogs, monkeys, and snakes live here.",
                  "translation": "Chim, nhện, ếch cây, khỉ và rắn sống ở đây.",
                  "audio": `${audioBase}/canopy_animals.wav`
                }
              ]
            },
            {
              "title": "Understory",
              "image": `${imageBase}/rf_understory.jpg`,
              "sentences": [
                {
                  "text": "In this part of the forest, it is dark, wet, and cool.",
                  "translation": "Ở phần này của rừng, nơi đây tối, ẩm ướt và mát mẻ.",
                  "audio": `${audioBase}/understory_dark.wav`
                },
                {
                  "text": "There aren't many plants.",
                  "translation": "Ở đây không có nhiều cây.",
                  "audio": `${audioBase}/understory_plants.wav`
                },
                {
                  "text": "Why? Because plants need light to live.",
                  "translation": "Tại sao? Vì cây cần ánh sáng để sống.",
                  "audio": `${audioBase}/understory_light.wav`
                },
                {
                  "text": "Snakes and lizards live here.",
                  "translation": "Rắn và thằn lằn sống ở đây.",
                  "audio": `${audioBase}/understory_animals.wav`
                },
                {
                  "text": "Jaguars like to live in this part, too!",
                  "translation": "Báo đốm cũng thích sống ở phần này!",
                  "audio": `${audioBase}/understory_jaguars.wav`
                }
              ]
            },
            {
              "title": "Forest Floor",
              "image": `${imageBase}/rf_forest_floor.jpg`,
              "sentences": [
                {
                  "text": "In this part, there are many insects and spiders.",
                  "translation": "Ở phần này, có nhiều côn trùng và nhện.",
                  "audio": `${audioBase}/floor_insects.wav`
                },
                {
                  "text": "Some spiders are as big as plates!",
                  "translation": "Một số nhện to bằng cái đĩa!",
                  "audio": `${audioBase}/floor_spiders.wav`
                },
                {
                  "text": "There are many large animals.",
                  "translation": "Có nhiều loài động vật lớn.",
                  "audio": `${audioBase}/floor_animals.wav`
                },
                {
                  "text": "And people live here, too!",
                  "translation": "Và con người cũng sống ở đây!",
                  "audio": `${audioBase}/floor_people.wav`
                }
              ]
            }
          ],
          "background_image": `${imageBase}/rf_background.jpg`
        }
      ]
    },
    {
      "slug": "read_circle_correct_words",
      "section": "Read. Circle the correct words",
      "title": "Circle the Correct Words",
      "type": "Read and Circle",
      "instruction": "Read each sentence and circle the correct word.",
      "questions": [
        {
          "text": "Rain forests are in countries **far from / near** the equator.",
          "choices": [
            "far from",
            "near"
          ],
          "answer": "near",
          "audio": `${audioBase}/rainforests_equator.wav`
        },
        {
          "text": "Plants make a lot of **oxygen / water.**",
          "choices": [
            "oxygen",
            "water"
          ],
          "answer": "oxygen",
          "audio": `${audioBase}/plants_oxygen.wav`
        },
        {
          "text": "Plants need **light / oxygen** to live.",
          "choices": [
            "light",
            "oxygen"
          ],
          "answer": "light",
          "audio": `${audioBase}/plants_light.wav`
        },
        {
          "text": "Many **leopards / birds** live in the top part of the rain forest.",
          "choices": [
            "leopards",
            "birds"
          ],
          "answer": "birds",
          "audio": `${audioBase}/top_part_animals.wav`
        },
        {
          "text": "Many large animals live on the **forest floor / tops of trees.**",
          "choices": [
            "forest floor",
            "tops of trees"
          ],
          "answer": "forest floor",
          "audio": `${audioBase}/forest_floor.wav`
        }
      ]
    },
    {
      "slug": "complete_the_chart",
      "section": "Complete the Chart",
      "title": "Complete the Chart",
      "type": "Chart Completion",
      "instruction": "Use these words to fill in the chart. You can use some words more than once: birds, dark, large animals, monkeys, snakes, spiders, sunny.",
      "chart": [
        {
          "part": "Emergent",
          "description": "Top of very tall trees",
          "audio": `${audioBase}/Emergent_sentence.wav`,
          "blanks": [
            "birds",
            "monkeys"
          ]
        },
        {
          "part": "Canopy",
          "description": "Layer under Emergent",
          "audio": `${audioBase}/Canopy_sentence.wav`,
          "blanks": [
            "birds",
            "snakes",
            "monkeys"
          ]
        },
        {
          "part": "Understory",
          "description": "Dark, wet, and cool layer",
          "audio": `${audioBase}/Understory_sentence.wav`,
          "blanks": [
            "dark",
            "snakes"
          ]
        },
        {
          "part": "Forest Floor",
          "description": "Bottom layer with many insects and animals",
          "audio": `${audioBase}/Forest_Floor_sentence.wav`,
          "blanks": [
            "large animals",
            "spiders"
          ]
        }
      ]
    },
    {
      "slug": "talk_about_parts",
      "section": "Talk About the Rain Forest",
      "title": "Talk About the Rain Forest",
      "type": "Speaking",
      "instruction": "Talk about the different parts of the rain forest. Work with a partner.",
      "prompts": [
        "Describe the Emergent layer and the animals living there.",
        "Describe the Canopy and the plants and animals found in it.",
        "Describe the Understory and why it is dark and wet.",
        "Describe the Forest Floor and the large animals and insects found there."
      ]
    }
  ]
}
export const unit5ReadWriteWhyDataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "sections": [
    {
      "slug": "read_write_why",
      "type": "Read and Write",
      "title": "Read and Write",
      "instruction": "Read the answers. Then write a question with why for each answer.",
      "items": [
        {
          "hiddenQuestion": {
            "text": "Why do spiders make webs?",
            "audio": `${audioBase}/question_spider_web.wav`
          },
          "answer": {
            "text": "Because they catch insects in them.",
            "audio": `${audioBase}/answer_spider_web.wav`
          },
          "hintImage": `${imageBase}/spider_web.jpg`
        },
        {
          "hiddenQuestion": {
            "text": "Why do birds build nests?",
            "audio": `${audioBase}/question_bird_nest.wav`
          },
          "answer": {
            "text": "Because they lay their eggs and raise their babies in them.",
            "audio": `${audioBase}/answer_bird_nest.wav`
          },
          "hintImage": `${imageBase}/bird_nest.jpg`
        },
        {
          "hiddenQuestion": {
            "text": "Why do bees live in hives?",
            "audio": `${audioBase}/question_beehive.wav`
          },
          "answer": {
            "text": "Because they need a place to keep their honey.",
            "audio": `${audioBase}/answer_beehive.wav`
          },
          "hintImage": `${imageBase}/beehive.jpg`
        },
        {
          "hiddenQuestion": {
            "text": "Why do people build houses?",
            "audio": `${audioBase}/question_house.wav`
          },
          "answer": {
            "text": "Because we need a place to stay warm and safe.",
            "audio": `${audioBase}/answer_house.wav`
          },
          "hintImage": `${imageBase}/house.jpg`
        }
      ]
    }
  ],
  "unit": "Unit 5"
}
export const unit5AskAndAnswerDataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "sections": [
    {
      "slug": "ask_and_answer",
      "type": "Ask and Answer",
      "title": "Ask and Answer",
      "instruction": "Talk about these animals. Work with a partner.",
      "items": [
        {
          "question": {
            "text": "Why do you like elephants?",
            "audio": `${audioBase}/question_elephant.wav`
          },
          "hiddenAnswer": {
            "text": "Because they are big and strong!",
            "audio": `${audioBase}/answer_elephant.wav`
          },
          "hintImage": `${imageBase}/elephant.jpg`
        },
        {
          "question": {
            "text": "Why do you like monkeys?",
            "audio": `${audioBase}/question_monkey.wav`
          },
          "hiddenAnswer": {
            "text": "Because they are funny and clever!",
            "audio": `${audioBase}/answer_monkey.wav`
          },
          "hintImage": `${imageBase}/monkey.jpg`
        },
        {
          "question": {
            "text": "Why do you like parrots?",
            "audio": `${audioBase}/question_parrot.wav`
          },
          "hiddenAnswer": {
            "text": "Because they're colorful and smart!",
            "audio": `${audioBase}/answer_parrot.wav`
          },
          "hintImage": `${imageBase}/parrot.jpg`
        },
        {
          "question": {
            "text": "Why do you like penguins?",
            "audio": `${audioBase}/question_penguin.wav`
          },
          "hiddenAnswer": {
            "text": "Because they are cute and they can swim!",
            "audio": `${audioBase}/answer_penguin.wav`
          },
          "hintImage": `${imageBase}/penguin.jpg`
        },
        {
          "question": {
            "text": "Why do you like spiders?",
            "audio": `${audioBase}/question_spider.wav`
          },
          "hiddenAnswer": {
            "text": "Because they make amazing webs!",
            "audio": `${audioBase}/answer_spider.wav`
          },
          "hintImage": `${imageBase}/spider.jpg`
        }
      ],
      "unit": "Unit 5"
    }
  ]
}
export const unit5RWritingDataTS: Unit5Data ={
  "slug": "unit5_animal_habitats",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "mounira_animal",
      "section": "Mounira's animal",
      "title": "Read and Write",
      "type": "Read and Write",
      "instruction": "Read about Mounira's animal. Underline words that tell you what the animal looks like. Write the name of the animal by choosing the correct picture.",
      "questions": [
        {
          "id": 1,
          "text": "My name is Mounira.",
          "vn": "Tên tôi là Mounira.",
          "audio": `${audioBase}/mounira1.wav`
        },
        {
          "id": 2,
          "text": "I live by the Nile River.",
          "vn": "Tôi sống bên sông Nile.",
          "audio": `${audioBase}/mounira2.wav`,
          "explanation": {
            "by": {
              "type": "preposition",
              "meaning": "bên cạnh, gần",
              "examples": [
                "I live by the Nile River.",
                "She sat by the window.",
                "There is a park by my house."
              ]
            }
          }
        },
        {
          "id": 3,
          "text": "This animal lives here.",
          "vn": "Con vật này sống ở đây.",
          "audio": `${audioBase}/mounira3.wav`
        },
        {
          "id": 4,
          "text": "What is it?",
          "vn": "Nó là gì?",
          "audio": `${audioBase}/mounira4.wav`
        },
        {
          "id": 5,
          "text": "Can you guess?",
          "vn": "Bạn có đoán được không?",
          "audio": `${audioBase}/mounira5.wav`
        },
        {
          "id": 6,
          "text": "It lives in the river.",
          "vn": "Nó sống trong sông.",
          "audio": `${audioBase}/mounira6.wav`
        },
        {
          "id": 7,
          "text": "It's brown and it has black spots on its back.",
          "vn": "Nó có màu nâu và có những đốm đen trên lưng.",
          "audio": `${audioBase}/mounira7.wav`,
          "explanation": {
            "its": {
              "type": "possessive pronoun",
              "meaning": "của nó (dùng cho con vật hoặc vật)",
              "examples": [
                "It has black spots on its back.",
                "It has big eyes on top of its head.",
                "The cat licked its paw."
              ]
            }
          }
        },
        {
          "id": 8,
          "text": "It has four short legs and a long tail.",
          "vn": "Nó có bốn chân ngắn và một cái đuôi dài.",
          "audio": `${audioBase}/mounira8.wav`
        },
        {
          "id": 9,
          "text": "It has big eyes on top of its head, and it uses them to see above the water.",
          "vn": "Nó có đôi mắt to trên đỉnh đầu, và nó dùng chúng để nhìn trên mặt nước.",
          "audio": `${audioBase}/mounira9.wav`,
          "explanation": {
            "its": {
              "type": "possessive pronoun",
              "meaning": "của nó (dùng cho con vật hoặc vật)",
              "examples": [
                "It has big eyes on top of its head."
              ]
            }
          }
        },
        {
          "id": 10,
          "text": "It has a strong mouth and sharp teeth!",
          "vn": "Nó có miệng khỏe và răng sắc!",
          "audio": `${audioBase}/mounira10.wav`
        },
        {
          "id": 11,
          "text": "It can walk and it can swim.",
          "vn": "Nó có thể đi bộ và bơi.",
          "audio": `${audioBase}/mounira11.wav`
        },
        {
          "id": 12,
          "text": "It is scary, but I like it!",
          "vn": "Nó đáng sợ, nhưng tôi thích nó!",
          "audio": `${audioBase}/mounira12.wav`
        },
        {
          "id": 13,
          "text": "Yes! It's a __.",
          "vn": "Đúng rồi! Nó là __.",
          "audio": `${audioBase}/mounira13.wav`,
          "images": [
            {
              "name": "Crocodile",
              "url": `${imageBase}/crocodile.jpg`
            },
            {
              "name": "Hippopotamus",
              "url": `${imageBase}/hippopotamus.jpg`
            },
            {
              "name": "Turtle",
              "url": `${imageBase}/turtle.jpg`
            }
          ]
        }
      ]
    },
    {
      "slug": "write_about_animal",
      "section": "Write about an animal you",
      "title": "Writing",
      "type": "Writing",
      "instruction": "Write about an animal you like. Include its name, where it lives, and what it looks like.",
      "questions": [
        {
          "id": 1,
          "text": "My name is ____.",
          "vn": "Tên tôi là ____.",
          "audio": `${audioBase}/write1.wav`
        },
        {
          "id": 2,
          "text": "I like ____.",
          "vn": "Tôi thích con ____.",
          "audio": `${audioBase}/write2.wav`
        },
        {
          "id": 3,
          "text": "It lives in ____.",
          "vn": "Nó sống ở ____.",
          "audio": `${audioBase}/write3.wav`
        },
        {
          "id": 4,
          "text": "It is ____ and has ____.",
          "vn": "Nó có màu ____ và có ____.",
          "audio": `${audioBase}/write4.wav`
        }
      ]
    },
    {
      "slug": "share_your_writing",
      "section": "Share your writing",
      "title": "Group Work",
      "type": "Group Work",
      "instruction": "Work in a small group. Listen to your classmates and fill in the chart below.",
      "chart": {
        "columns": [
          "Name",
          "Animal",
          "Where it lives",
          "What it looks like"
        ],
        "rows": [
          {
            "Name": "",
            "Animal": "",
            "Where it lives": "",
            "What it looks like": ""
          },
          {
            "Name": "",
            "Animal": "",
            "Where it lives": "",
            "What it looks like": ""
          },
          {
            "Name": "",
            "Animal": "",
            "Where it lives": "",
            "What it looks like": ""
          }
        ]
      }
    }
  ]
}
export const unit5WorkbookVocabSectionDataTS: Unit5WorkbookVocabSection ={
  "slug": "unit5_animal_habitats_workbook",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
                  {
                    "slug": "vocabulary1",
                    "section": "Vocabulary 1",
                    "title": "Look and Match",
                    "type": "Vocabulary",
                    "instruction": "Look at the pictures (left) and match them with the correct words, meanings, and listen to the audio (right).",
                    "content": [
                      {
                        "image": `${imageBase}/wetlands.jpg`,
                        "word": "wetlandsaaaa",
                        "pronunciation": "/ˈwet.lændz/",
                        "meaning": "vùng đất ngập nước",
                        "example": "Many birds live in wetlands.",
                        "audio": `${audioBase}/wetlands.wav`
                      },
                      {
                        "image": `${imageBase}/grasslands.jpg`,
                        "word": "grasslands",
                        "pronunciation": "/ˈɡræs.lændz/",
                        "meaning": "đồng cỏ",
                        "example": "Grasslands are home to many herbivores.",
                        "audio": `${audioBase}/grasslands.wav`
                      },
                      {
                        "image": `${imageBase}/a_forest.jpg`,
                        "word": "a forest",
                        "pronunciation": "/ə ˈfɒr.ɪst/",
                        "meaning": "một khu rừng",
                        "example": "A forest provides shelter for wildlife.",
                        "audio": `${audioBase}/a_forest.wav`
                      },
                      {
                        "image": `${imageBase}/a_rain_forest.jpg`,
                        "word": "a rain forest",
                        "pronunciation": "/ə ˈreɪn ˌfɒr.ɪst/",
                        "meaning": "một khu rừng mưa",
                        "example": "Rain forests have high biodiversity.",
                        "audio": `${audioBase}/a_rain_forest.wav`
                      },
                      {
                        "image": `${imageBase}/ice.jpg`,
                        "word": "ice",
                        "pronunciation": "/aɪs/",
                        "meaning": "băng",
                        "example": "Polar bears live on ice.",
                        "audio": `${audioBase}/ice.wav`
                      },
                      {
                        "image": `${imageBase}/a_web.jpg`,
                        "word": "a web",
                        "pronunciation": "/ə wɛb/",
                        "meaning": "mạng nhện",
                        "example": "Spiders spin a web to catch insects.",
                        "audio": `${audioBase}/a_web.wav`
                      },
                      {
                        "image": `${imageBase}/underground.jpg`,
                        "word": "underground",
                        "pronunciation": "/ˌʌn.dəˈɡraʊnd/",
                        "meaning": "dưới đất",
                        "example": "Moles live underground.",
                        "audio": `${audioBase}/underground.wav`
                      },
                      {
                        "image": `${imageBase}/snow.jpg`,
                        "word": "snow",
                        "pronunciation": "/snoʊ/",
                        "meaning": "tuyết",
                        "example": "Penguins live in areas with snow.",
                        "audio": `${audioBase}/snow.wav`
                      },
                      {
                        "image": `${imageBase}/mud.jpg`,
                        "word": "mud",
                        "pronunciation": "/mʌd/",
                        "meaning": "bùn",
                        "example": "Frogs hide in mud to stay cool.",
                        "audio": `${audioBase}/mud.wav`
                      },
                      {
                        "image": `${imageBase}/a_hive.jpg`,
                        "word": "a hive",
                        "pronunciation": "/ə haɪv/",
                        "meaning": "tổ ong",
                        "example": "Bees live in a hive.",
                        "audio": `${audioBase}/a_hive.wav`
                      },
                      {
                        "image": `${imageBase}/a_nest.jpg`,
                        "word": "a nest",
                        "pronunciation": "/ə nɛst/",
                        "meaning": "tổ chim",
                        "example": "Birds build a nest to lay eggs.",
                        "audio": `${audioBase}/a_nest.wav`
                      },
                      {
                        "image": `${imageBase}/an_island.jpg`,
                        "word": "an island",
                        "pronunciation": "/ən ˈaɪ.lənd/",
                        "meaning": "một hòn đảo",
                        "example": "Some animals live only on a specific island.",
                        "audio": `${audioBase}/an_island.wav`
                      },
                      {
                        "image": `${imageBase}/a_cave.jpg`,
                        "word": "a cave",
                        "pronunciation": "/ə keɪv/",
                        "meaning": "một hang động",
                        "example": "Bats live in caves.",
                        "audio": `${audioBase}/a_cave.wav`
                      },
                      {
                        "image": `${imageBase}/a_desert.jpg`,
                        "word": "a desert",
                        "pronunciation": "/ə ˈdez.ɚt/",
                        "meaning": "một sa mạc",
                        "example": "Camels can survive in a desert.",
                        "audio": `${audioBase}/a_desert.wav`
                      }
                    ]
                  },
                    {
                      "slug": "look_pictures_read_write",
                      "section": "Look at the pictures. Read and write",
                      "title": "WRITING",
                      "type": "Reading and Writing",
                      "instruction": "Look at the pictures. Read and write the answers.",
                      "questions": [
                        {
                          "en": "What's the hippo playing in?aaa",
                          "vi": "Hà mã đang chơi trong cái gì?",
                          "image": `${imageBase}/hippo_playing.jpg`,
                          "audio": `${audioBase}/hippo_playing.wav`,
                          "answer": {
                            "en": "It's playing in the mud.",
                            "vi": "Nó đang chơi trong nước.",
                            "audio": `${audioBase}/hippo_playing_mud.wav`
                          }
                        },
                        {
                          "en": "What's the iceberg made of?",
                          "vi": "Tảng băng được tạo thành từ gì?",
                          "image":`${imageBase}/iceberg.jpg`,
                          "audio": `${audioBase}/iceberg.wav`,
                          "answer": {
                            "en": "It's made of ice.",
                            "vi": "Nó được tạo thành từ băng.",
                            "audio": `${audioBase}/iceberg_ice.wav`
                          }
                        },
                        {
                          "en": "Where do trees grow?",
                          "vi": "Cây mọc ở đâu?",
                          "image": `${imageBase}/trees.jpg`,
                          "audio": `${audioBase}/trees_grow.wav`,
                          "answer": {
                            "en": "They grow in the grasslands.",
                            "vi": "Chúng mọc trong đất.",
                            "audio": `${audioBase}/trees_grow_grasslands.wav`
                          }
                        }
                      ]
                    },
                      {
                          "slug": "reading_listen_and_read",
                          "section": "Listen and Read",
                          "title": "The Coolest Animals Live in Antarctica!",
                          "type": "Reading",
                          "instruction": "Listen and read the passage about animals living in Antarctica. Look at the pictures to understand better.",
                          "paragraphs": [
                            {
                              "text": "The Coolest Animals Live in Antarctica!",
                              "image":  `${imageBase}/antarctica_map.jpg`,
                              "audio": `${audioBase}/reading_1.wav`
                            },
                            {
                              "text": "Antarctica is very cold, very dry, and very windy.",
                              "image":  `${imageBase}/emperor_penguin.jpg`,
                              "audio": `${audioBase}/reading_2.wav`
                            },
                            {
                              "text": "Can animals live there? Yes, they can!",
                              "image":  `${imageBase}/arctic_tern.jpg`,
                              "audio": `${audioBase}/reading_3.wav`
                            },
                            {
                              "text": "The emperor penguin is a bird. It can't fly, but it can swim.",
                              "audio":  `${audioBase}/reading_4.wav`
                            },
                            {
                              "text": "The mother penguin lays an egg on the ice. Where is the nest for this egg?",
                              "audio":  `${audioBase}/reading_5.wav`
                            },
                            {
                              "text": "The father emperor penguin takes care of the egg. He puts it on his feet! Why? Because he can keep the egg warm.",
                              "audio":  `${audioBase}/reading_6.wav`
                            },
                            {
                              "text": "The Weddell seal lives in Antarctica, too. It spends a lot of time in the ocean.",
                              "audio":  `${audioBase}/reading_7.wav`
                            },
                            {
                              "text": "It can stay underwater for forty-five minutes. The seal swims under the ice. Why? Because it catches fish and eats underwater. It is safe under the ice.",
                              "audio":  `${audioBase}/reading_8.wav`
                            },
                            {
                              "text": "The Arctic tern is a small but amazing bird. It lives in Antarctica in the winter and flies to the Arctic in the summer!",
                              "audio":  `${audioBase}/reading_9.wav`
                            },
                            {
                              "text": "Why do the terns fly to the Arctic? Because the birds make nests there. The nests are on the ground. The mother lays eggs in the nest. The parents protect their nest and their babies. The parents feed the young birds, too.",
                              "audio":  `${audioBase}/reading_10.wav`
                            }
                          ]
                        },
                        {
                          "slug": "reading_true_false",
                          "section": "Read and Check",
                          "title": "Read and Check True or False",
                          "type": "TrueFalse",
                          "instruction": "Read the statements and check T for True or F for False.",
                          "questions": [
                            {
                              "q": "The emperor penguin can swim well.",
                              "answer": "T",
                              "image": `${imageBase}/emperor_penguin.jpg`,
                              "audio":  `${audioBase}/truefalse_1.wav`
                            },
                            {
                              "q": "The emperor penguin father takes care of the egg.",
                              "answer": "T",
                              "image": `${imageBase}/emperor_penguin.jpg`,
                              "audio": `${audioBase}/truefalse_2.wav`
                            },
                            {
                              "q": "The Weddell seal can swim under the ice.",
                              "answer": "T",
                              "image": `${imageBase}/weddell_seal.jpg`,
                              "audio": `${audioBase}/truefalse_3.wav`
                            },
                            {
                              "q": "Antarctica is hot and sunny.",
                              "answer": "F",
                              "image": `${imageBase}/antarctica_map.jpg`,
                              "audio": `${audioBase}/truefalse_4.wav`
                            },
                            {
                              "q": "The Arctic tern flies to the Arctic in the summer.",
                              "answer": "T",
                              "image": `${imageBase}/arctic_tern.jpg`,
                              "audio": `${audioBase}/truefalse_5.wav`
                            }
                          ]
                        },
                          {
                            "slug": "reading_complete_chart",
                            "section": "Complete the chart",
                            "title": "Complete the chart. Then work with a partner. Talk about animals in Antarctica",
                            "type": "Chart",
                            "instruction": "Fill in the chart about animals in Antarctica. Then discuss with a partner.",
                            "table": {
                              "headers": [
                                "Animal",
                                "What can it do?",
                                "More information"
                              ],
                              "rows": [
                                [
                                  "Emperor penguin",
                                  "__ lays an egg on the ice. The father takes care of the egg.",
                                  "The __ puts the egg on his feet. He keeps the egg warm."
                                ],
                                [
                                  "Weddell seal",
                                  "It spends a lot of time in the ocean.",
                                  "It can swim under the ice. It eats __."
                                ],
                                [
                                  "Arctic tern",
                                  "It flies between __ and the Arctic.",
                                  "It lives __ in the winter. It flies to the Arctic in the summer. It builds a nest and lays eggs in the Arctic."
                                ]
                              ]
                            },
                            "answers": [
                              [
                                "The mother",
                                "The father"
                              ],
                              [
                                "fish"
                              ],
                              [
                                "Antarctica",
                                "in Antarctica"
                              ]
                            ],
                            "images": [
                              `${imageBase}/antarctica_map.jpg`,
                              `${imageBase}/emperor_penguin.jpg`,
                              `${imageBase}/arctic_tern.jpg`
                            ],
                            "audio": `${audioBase}/complete_chart_antarctica.wav`
                          },
                        {
                          "slug": "reading_read_write",
                          "section": "Read and Write",
                          "title": "Read and Write",
                          "type": "Fill-in-the-blank",
                          "instruction": "Fill in the blanks with the correct word.",
                          "questions": [
                            {
                              "text": "The father emperor penguin takes care of the __.",
                              "answer": "egg",
                              "audio": `${audioBase}/readwrite_1.wav`
                            },
                            {
                              "text": "The Weddell seal can swim under the __.",
                              "answer": "ice",
                              "audio": `${audioBase}/readwrite_2.wav`
                            },
                            {
                              "text": "The Arctic tern flies between __ and the Arctic.",
                              "answer": "Antarctica",
                              "audio": `${audioBase}/readwrite_3.wav`
                            },
                            {
                              "text": "The Arctic tern builds a __ in the Arctic.",
                              "answer": "nest",
                              "audio": `${audioBase}/readwrite_4.wav`
                            }
                          ]
                        },
                        {
                          "slug": "reading_weird_but_true",
                          "section": "Weird but True",
                          "title": "Weird but True",
                          "type": "Reading",
                          "instruction": "Learn interesting facts about polar bears.",
                          "paragraphs": [
                            {
                              "text": "Polar bears live in the Arctic.",
                              "audio": `${audioBase}/weird_1.wav`
                            },
                            {
                              "text": "A polar bear's fur is white, but its skin is black!",
                              "audio": `${audioBase}/weird_2.wav`
                            }
                          ]
                        }
    ]
  
}
export const unit5WorkbookSongSectionDataTS: Unit5WorkbookSection ={
  "slug": "unit5_animal_habitats_workbook",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "song_listen_read_match",
      "section": "Song",
      "title": "Listen to the song. Read. Draw lines to match.",
      "type": "Song",
      "instruction": "Listen to the song. Read the questions and draw lines to match with the correct answers.",
      "questions": [
        {
          "en": "Why does a giraffe have a long neck?",
          "vi": "Tại sao hươu cao cổ có cái cổ dài?",
          "image": `${imageBase}/giraffe_neck.jpg`,
          "audio": `${audioBase}/giraffe_question.wav`,
          "answer": {
            "en": "Because it eats leaves at the top of the trees.",
            "vi": "Bởi vì nó ăn lá ở trên ngọn cây.",
            "audio": `${audioBase}/giraffe_answer.wav`
          }
        },
        {
          "en": "Why does a frog have strong legs?",
          "vi": "Tại sao con ếch có đôi chân khỏe?",
          "image": `${imageBase}/frog_legs.jpg`,
          "audio": `${audioBase}/frog_question.wav`,
          "answer": {
            "en": "Because it hops, swims, and jumps.",
            "vi": "Bởi vì nó nhảy, bơi và bật cao.",
            "audio": `${audioBase}/frog_answer.wav`
          }
        },
        {
          "en": "Why does a polar bear have white fur?",
          "vi": "Tại sao gấu Bắc Cực có bộ lông trắng?",
          "image": `${imageBase}/polarbear_fur.jpg`,
          "audio": `${audioBase}/polarbear_question.wav`,
          "answer": {
            "en": "Because it lives in ice and snow.",
            "vi": "Bởi vì nó sống trong băng và tuyết.",
            "audio": `${audioBase}/polarbear_answer.wav`
          }
        }
      ]
    },
    {
      "slug": "song_write_new_verse",
      "section": "Song",
      "title": "Write a new verse for the song. Use words from the box. Draw a picture for your verse.",
      "type": "Song Writing",
      "instruction": "Write a new verse for the song. Use words from the box. Draw a picture for your verse.",
      "word_box": [
        "climbs trees",
        "a crocodile",
        "eats meat",
        "hops",
        "a kangaroo",
        "a lion",
        "a monkey",
        "sharp claws",
        "sharp teeth",
        "strong arms",
        "strong legs",
        "swings in trees",
        "a tiger"
      ],
      "template": {
        "question": "Why does __ have __? Why? Why?",
        "answer": "Because it ___________________________________________"
      }
    }
  ]
}
export const unit5WorkbookGrammar1SectionDataTS: Unit5WorkbookSection ={
  "slug": "unit5_animal_habitats_workbook",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "grammar1",
      "section": "Why ...?/Because ...",
      "instruction": "Grammar 1 activities",
      "children": [
        {
          "slug": "questions_answers",
          "section": "Why ...?/Because ...",
          "instruction": "Look at the questions and answers.",
          "questions": [
            {
              "question": {
                "why": "Why",
                "aux": "do",
                "subject": "snakes",
                "clause": "come out during the day?"
              },
              "answer": {
                "because": "Because",
                "subject": "they",
                "clause": "like the sun.",
                "audio": `${audioBase}/grammar1_snakes.wav`
              }
            },
            {
              "question": {
                "why": "Why",
                "aux": "don't",
                "subject": "you",
                "clause": "like crocodiles?"
              },
              "answer": {
                "because": "Because",
                "subject": "they",
                "clause": "are scary.",
                "audio": `${audioBase}/grammar1_crocodiles.wav`
              }
            },
            {
              "question": {
                "why": "Why",
                "aux": "can",
                "subject": "frogs",
                "clause": "jump high?"
              },
              "answer": {
                "because": "Because",
                "subject": "they",
                "clause": "have strong legs.",
                "audio": `${audioBase}/grammar1_frogs.wav`
              }
            },
            {
              "question": {
                "why": "Why",
                "aux": "can't",
                "subject": "birds",
                "clause": "climb trees?"
              },
              "answer": {
                "because": "Because",
                "subject": "they",
                "clause": "don't have arms.",
                "audio": `${audioBase}/grammar1_birds.wav`
              }
            }
          ]
        },
        {
          "slug": "read_write_wordbox",
          "section": "Read and write. Use words from the box.",
          "instruction": "Fill in the blanks using words from the box: Are, Because, do, does, don't, is, Why.",
          "word_box": [
            "Are",
            "Because",
            "do",
            "does",
            "don't",
            "is",
            "Why"
          ],
          "questions": [
            {
              "sentences": [
                "__ fish run?",
                "__ They don't have legs."
              ],
              "answers_sentences1": ["Why", "do"],
              "answers_sentences2": ["Because"],
              "image": `${imageBase}/unit5_grammar1_readwrite_fish.jpg`,
              "audio_sentences": [
                `${audioBase}/Qgrammar1_fish.wav`,
                `${audioBase}/Qgrammar2_fish.wav`
              ]
            },  
            {
              "sentences": [
                "__ hippos stand in water?",
                "__ the sun is hot, and hippos feel cool in the water."
              ],
              "answers_sentences1": ["Why", "do"],
              "answers_sentences2": ["Because"],
              "image": `${imageBase}/unit5_grammar1_readwrite_hippo.jpg`,              
              "audio_sentences": [
                `${audioBase}/Qgrammar1_hippo.wav`,
                `${audioBase}/Qgrammar2_hippo.wav`
              ]
            },
            {
              "sentences": [
                "__ the parrot eating a nut?",
                "__ parrots like nuts."
              ],
              "answers_sentences1": ["Is"],
              "answers_sentences2": ["Because"],
              "image": `${imageBase}/unit5_grammar1_readwrite_parrot.jpg`,              
              "audio_sentences": [
                `${audioBase}/Qgrammar1_parrot.wav`,
                `${audioBase}/Qgrammar2_parrot.wav`
              ]
            },
            {
              "sentences": [
                "__ the desert dry?",
                "__ there is very little rain in the desert."
              ],
              "answers_sentences1": ["Why","is"],
              "answers_sentences2": ["Because"],
              "image": `${imageBase}/unit5_grammar1_readwrite_desert.jpg`,
              "audio_sentences": [
                `${audioBase}/Qgrammar1_desert.wav`,
                `${audioBase}/Qgrammar2_desert.wav`
              ]
            },
            {
              "sentences": [
                "__ the birds in the wetlands?",
                "__ they eat frogs and fish, and frogs and fish live in the wetlands."
              ],
              "answers_sentences1": ["Are"],
              "answers_sentences2": ["Because"],
              "image": `${imageBase}/unit5_grammar1_readwrite_wetlands.jpg`,
              "audio_sentences": [
                `${audioBase}/Qgrammar1_wetlands.wav`,
                `${audioBase}/Qgrammar2_wetlands.wav`
              ]
            },
            {
              "sentences": [
                "__ the tiger drink water?",
                "__ it is thirsty."
              ],
              "answers_sentences1": ["Does"],
              "answers_sentences2": ["Because"],
              "image": `${imageBase}/unit5_grammar1_readwrite_tiger.jpg`,
              "audio_sentences": [
                `${audioBase}/Qgrammar1_tiger.wav`,
                `${audioBase}/Qgrammar2_tiger.wav`
              ]
            },
            {
              "sentences": [
                "__ zebras live underground?",
                "__ zebras eat grass, and there isn't any grass underground."
              ],
              "answers_sentences1": ["Do"],
              "answers_sentences2": ["Because"],
              "image": `${imageBase}/unit5_grammar1_readwrite_zebra.jpg`,
              "audio_sentences": [
                `${audioBase}/Qgrammar1_zebra.wav`,
                `${audioBase}/Qgrammar2_zebra.wav`
              ]
            }
          ]
        },
        {
          "slug": "read_match",
          "section": "Read and match. Draw lines.",
          "instruction": "Match the questions with the correct answers. Draw lines.",
          "questions": [
            {
              "question": "Why is the rabbit going underground?",
              "answer": "Because its home is underground.",
              "image": `${imageBase}/unit5_grammar1_match_rabbit.jpg`,
              "audio_q": `${audioBase}/Qgrammar1_match_rabbit.wav`,
              "audio_a": `${audioBase}/Agrammar1_match_rabbit.wav`
            },
            {
              "question": "Why don't penguins live on grasslands?",
              "answer": "Because penguins need to eat fish and food in the ocean.",
              "image": `${imageBase}/unit5_grammar1_match_penguin.jpg`,
              "audio_q": `${audioBase}/Qgrammar1_match_penguin.wav`,
              "audio_a": `${audioBase}/Agrammar1_match_penguin.wav`
            },
            {
              "question": "Why are the zebras running?",
              "answer": "Because they see a lion, and they are scared.",
              "image": `${imageBase}/unit5_grammar1_match_zebra.jpg`,
              "audio_q": `${audioBase}/Qgrammar1_match_zebra.wav`,
              "audio_a": `${audioBase}/Agrammar1_match_zebra.wav`
            },
            {
              "question": "Why are the elephants in the water?",
              "answer": "Because they are taking a bath.",
              "image": `${imageBase}/unit5_grammar1_match_elephant.jpg`,
              "audio_q": `${audioBase}/Qgrammar1_match_elephant.wav`,
              "audio_a": `${audioBase}/Agrammar1_match_elephant.wav`,
            },
            {
              "question": "Why is the bird flying to the nest?",
              "answer": "Because its babies are in the nest.",
              "image": `${imageBase}/unit5_grammar1_match_bird.jpg`,
              "audio_q": `${audioBase}/Qgrammar1_match_bird.wav`,
              "audio_a": `${audioBase}/Agrammar1_match_bird.wav`
            }
          ]
        },
        {
          "slug": "write_like_dislike",
          "section": "Write. What do you like? What don't you like?",
          "instruction": "Work with a partner. Read your partner's sentences. Ask your partner questions. Use words from the box.",
          "word_box": [
            "caves",
            "forests",
            "grasslands",
            "hives",
            "ice",
            "islands",
            "mud",
            "rain forests",
            "snow",
            "webs"
          ],
          "examples": [
            {
              "sentence": "I like rain forests.",
              "question": "Why do you like rain forests?",
              "answer": "Because I like monkeys and parrots, and they live in rain forests.",
              "audio": `${audioBase}/grammar1_like_rainforests.wav`
            },
            {
              "sentence": "I don't like ice.",
              "question": "Why don't you like ice?",
              "answer": "Because it is too cold.",
              "audio": `${audioBase}/grammar1_dontlike_ice.wav`
            }
          ]
        }
      ]
    }
  ]
}
export const unit5WorkbookVocabulary2SectionDataTS: Unit5WorkbookSection ={
  "slug": "unit5_animal_habitats_workbook",
  "unit": "Unit 5 – Animal Habitats",
  "section": "Vocabulary 2",
  "title": "VOCABULARY 2",
  "type": "Workbook",
  "sections": [
    {
      "slug": "vocabulary2_listen_write",
      "section": "Listen and Write",
      "title": "Listen and write. Use words from the box",
      "instruction": "Listen and fill in the blanks with words from the box: fur, horns, pouch, tongue, wings.",
      "type": "Fill in the blanks",
      "word_box": [
        "fur",
        "horns",
        "pouch",
        "tongue",
        "wings"
      ],
      "questions": [
        {
          "q": "A kangaroo has a __.",
          "answer": "pouch",
          "audio": `${audioBase}/kangaroo_pouch.wav`,
          "image": `${imageBase}/kangaroo.jpg`
        },
        {
          "q": "A butterfly has __. It can fly.",
          "answer": "wings",
          "audio": `${audioBase}/butterfly_wings.wav`,
          "image": `${imageBase}/butterfly.jpg`
        },
        {
          "q": "A frog has a long, sticky __.",
          "answer": "tongue",
          "audio": `${audioBase}/frog_tongue.wav`,
          "image": `${imageBase}/frog_long_tongue.jpg`
        },
        {
          "q": "A goat has two __ on its head.",
          "answer": "horns",
          "audio": `${audioBase}/goat_horns.wav`,
          "image": `${imageBase}/goat.jpg`
        },
        {
          "q": "A lion has __.",
          "answer": "fur",
          "audio": `${audioBase}/lion_fur.wav`,
          "image": `${imageBase}/lionfur.jpg`
        }
      ]
    },
    {
      "slug": "vocabulary2_look_read_true_false",
      "section": "Look and Read",
      "title": "Look and read. Check T for True or F for False",
      "instruction": "Look at the pictures. Read the sentences. Check T for True or F for False.",
      "type": "True/False",
      "questions": [
        {
          "q": "A giraffe has a long tongue.",
          "answer": "T",
          "audio": `${audioBase}/giraffeT.wav`,
          "image": `${imageBase}/giraffe.jpg`
        },
        {
          "q": "A cow has a pouch.",
          "answer": "F",
          "audio": `${audioBase}/cowF.wav`,
          "image": `${imageBase}/cow.jpg`
        },
        {
          "q": "A chicken has wings.",
          "answer": "T",
          "audio": `${audioBase}/chickenT.wav`,
          "image": `${imageBase}/chicken.jpg`
        },
        {
          "q": "A panda has black and white fur.",
          "answer": "T",
          "audio": `${audioBase}/pandaT.wav`,
          "image": `${imageBase}/panda.jpg`
        },
        {
          "q": "A donkey has horns.",
          "answer": "F",
          "audio": `${audioBase}/donkeyF.wav`,
          "image": `${imageBase}/donkey.jpg`
        }
      ]
    }
  ]
}
export const unit5WorkbookGrammar2SectionDataTS: Unit5WorkbookSection ={
  "slug": "unit5_animal_habitats_workbook",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "grammar2_infinitive_of_purpose",
      "section": "Grammar 2",
      "title": "Infinitive of purpose",
      "type": "Table",
      "instruction": "Look at the table about how animals use parts of their body with infinitive of purpose.",
      "table": {
        "headers": [
          "Animals",
          "use",
          "their",
          "body parts",
          "to + infinitive",
          "",
          "examples"
        ],
        "rows": [
          [
            "Parrots",
            "use",
            "their",
            "wings",
            "**to fly.**",
            "",
            ""
          ],
          [
            "Cats",
            "use",
            "their",
            "tongues",
            "**to clean.**",
            "",
            "their fur."
          ],
          [
            "Kangaroos",
            "use",
            "their",
            "pouches",
            "**to carry.**",
            "",
            "their babies."
          ]
        ]
      }
    },
    {
      "slug": "listen_and_write",
      "section": "Listen and Write",
      "title": "Listen and Write",
      "type": "Fill-in-the-blank",
      "instruction": "Listen and write the correct infinitive of purpose in the blanks.",
      "word_bank": [
        "to carry",
        "to clean",
        "to eat",
        "to fight",
        "to fly",
        "to hide",
        "to jump",
        "to protect",
        "to run",
        "to swim"
      ],
      "questions": [
        {
          "text": "Goats use their horns ___.",
          "audio": `${audioBase}/goats_horns.wav`
        },
        {
          "text": "Polar bears use their white fur ___ in the ice and snow.",
          "audio": `${audioBase}/polar_bears.wav`
        },
        {
          "text": "Lions use their teeth ___ meat.",
          "audio": `${audioBase}/lions_teeth.wav`
        },
        {
          "text": "Horses use their legs ___.",
          "audio": `${audioBase}/horses_legs.wav`
        },
        {
          "text": "Ostriches use their legs ___ fast.",
          "audio": `${audioBase}/ostriches_legs.wav`
        },
        {
          "text": "Giraffes use their long tongues ___ their eyes.",
          "audio": `${audioBase}/giraffes_tongues.wav`
        },
        {
          "text": "Tigers use their mouths ___ their babies.",
          "audio": `${audioBase}/tigers_mouths.wav`
        },
        {
          "text": "Penguins use their wings ___.",
          "audio": `${audioBase}/penguins_wings.wav`
        },
        {
          "text": "Cats use their sharp claws ___ their babies.",
          "audio": `${audioBase}/cats_claws.wav`
        },
        {
          "text": "Owls use their wings ___.",
          "audio": `${audioBase}/owls_wings.wav`
        }
      ]
    },
    {
      "slug": "what_about_you",
      "section": "What about you? Write",
      "title": "What about you?",
      "type": "Writing",
      "instruction": "Answer the questions using infinitives of purpose.",
      "questions": [
        "What do you use to eat? ______",
        "What do you use to walk? ______",
        "What do you use to write? ______"
      ]
    },
    {
      "slug": "work_with_a_partner",
      "section": "Work with a partner",
      "title": "Work with a partner. Take turns. Read your part of each sentence. Listen to your partner's part. Write it. Read the sentences together.",
      "type": "Dialogue-Writing",
      "instruction": "Read the first part of the sentence. Your partner reads the second part. Complete the sentence together.",
      "questions": [
        {
          "text": "Crocodiles use their sharp teeth ___",
          "dictionary": "to eat meat",
          "audio": `${audioBase}/crocodiles_teeth.wav`
        },
        {
          "text": "Elephants use their long trunks ___",
          "dictionary": "to shower",
          "audio": `${audioBase}/elephants_trunks.wav`
        },
        {
          "text": "Butterflies use their wings ___",
          "dictionary": "to fly",
          "audio": `${audioBase}/butterflies_wings.wav`
        },
        {
          "text": "Sheep use their horns ___",
          "dictionary": "to fight",
          "audio": `${audioBase}/sheep_horns.wav`
        },
        {
          "text": "Crocodiles use their long, strong tails ___",
          "dictionary": "to swim",
          "audio":`${audioBase}/crocodiles_tails.wav`
        }
      ]
    }
  ]
}
export const unit5WorkbookGameTimePuzzleSectionDataTS: Unit5WorkbookSection ={
  "slug": "unit5_animal_habitats_workbook",
  "unit": "Unit 5 – Animal Habitats",
  "sections": [
    {
      "slug": "game_time_puzzle",
      "section": "Game Time!",
      "title": "Game Time! Read the clues. Do the puzzle",
      "type": "Puzzle",
      "instruction": "Read the clues and unscramble the words to complete the sentences.",
      "word_bank": [
        "GEONUT",
        "GIWSN",
        "HONRS",
        "CEABESU",
        "LATDENSW",
        "GAASLRDNSS",
        "RETSED",
        "IRNA SROFTE"
      ],
      "questions": [
        {
          "text": "Why can a frog catch a fly with its ___?",
          "answer": "tongue",
          "audio": `${audioBase}/game_frog_tongue.wav`
        },
        {
          "text": "Why can't a zebra fly? Because it doesn't have ___",
          "answer": "wings",
          "audio": `${audioBase}/game_zebra_wings.wav`
        },
        {
          "text": "Goats use their ___ to fight.",
          "answer": "horns",
          "audio": `${audioBase}/game_goat_horns.wav`
        },
        {
          "text": "Why does an owl have big eyes? ___ it needs to see at night.",
          "answer": "because",
          "audio": `${audioBase}/game_owl_eyes.wav`
        },
        {
          "text": "Many turtles live in ___",
          "answer": "seas",
          "audio": `${audioBase}/game_turtles_seas.wav`
        },
        {
          "text": "Lions live in ___",
          "answer": "grasslands",
          "audio": `${audioBase}/game_lions_grasslands.wav`
        },
        {
          "text": "Camels live in the ___",
          "answer": "desert",
          "audio": `${audioBase}/game_camels_desert.wav`
        },
        {
          "text": "Big spiders live in the ___",
          "answer": "rain forest",
          "audio": `${audioBase}/game_spiders_rainforest.wav`
        }
      ]
    },
    {
      "slug": "listen_and_read_fast",
      "section": "Listen and Read",
      "title": "Can you say these fast?",
      "type": "Listen and Read",
      "instruction": "Listen and read the sentences aloud. Try to say them as fast as you can!",
      "questions": [
        {
          "text": "My nephew never stands next to a nest.",
          "audio": `${audioBase}/fast_nephew_nest.wav`
        },
        {
          "text": "We walk through the wetlands in windy weather.",
          "audio": `${audioBase}/fast_wetlands_weather.wav`
        },
        {
          "text": "Do the polar bear and panda play in the park?",
          "audio": `${audioBase}/fast_polar_panda.wav`
        }
      ]
    }
  ]
}