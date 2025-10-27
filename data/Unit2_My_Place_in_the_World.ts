import {
  unit2ReadingData,
  Unit2WritingData,
  Unit2Vocabulary1Data,
  Unit2SongData,
  Unit2Grammar1Data,
  Unit2Vocabulary2Data,
  Unit2Grammar2Data
} from "./type";
const audioBase = "https://raw.githubusercontent.com/klamts/Unit2_My_Place_in_the_World/main";
const imageBase = "https://raw.githubusercontent.com/klamts/images/main";


export const unit2ReadingDataTS : unit2ReadingData = {
  "slug": "unit2_reading",
  "title": "Unit 2 – Reading",
  "sections": [
    {
      "slug": "listen_and_read",
      "section": "Listen and Read",
      "type": "Reading",
      "title": "Eye in the Sky",
      "image": `${imageBase}/unit2_reading_eye_in_the_sky.jpg`,
      "content": [
        {
          "text": "Satellites are machines in space that circle Earth.",
          "translation": "Vệ tinh là những cỗ máy trong không gian quay quanh Trái Đất.",
          "audio": `${audioBase}/reading_1.wav`
        },
        {
          "text": "They help us talk to people on the other side of the planet.",
          "translation": "Chúng giúp chúng ta nói chuyện với những người ở phía bên kia của hành tinh.",
          "audio": `${audioBase}/reading_2.wav`
        },
        {
          "text": "They can also study the planet's weather.",
          "translation": "Chúng cũng có thể nghiên cứu thời tiết của Trái Đất.",
          "audio": `${audioBase}/reading_3.wav`
        },
        {
          "text": "This satellite is called GeoEye 1.",
          "translation": "Vệ tinh này có tên là GeoEye 1.",
          "audio": `${audioBase}/reading_4.wav`
        },
        {
          "text": "It is the same size as a big car.",
          "translation": "Nó có kích thước bằng một chiếc ô tô lớn.",
          "audio": `${audioBase}/reading_5.wav`
        },
        {
          "text": "It takes photos of our planet.",
          "translation": "Nó chụp ảnh hành tinh của chúng ta.",
          "audio": `${audioBase}/reading_6.wav`
        },
        {
          "text": "These pictures can show our continents and oceans.",
          "translation": "Những bức ảnh này có thể cho thấy các châu lục và đại dương của chúng ta.",
          "audio": `${audioBase}/reading_7.wav`
        },
        {
          "text": "They can show our streets and houses, too!",
          "translation": "Chúng cũng có thể hiển thị cả đường phố và nhà cửa của chúng ta!",
          "audio": `${audioBase}/reading_8.wav`
        },
        {
          "text": "On the Internet, there are many photos and maps of Earth.",
          "translation": "Trên Internet có rất nhiều hình ảnh và bản đồ của Trái Đất.",
          "audio": `${audioBase}/reading_9.wav`
        },
        {
          "text": "We can use these images to help us explore our world.",
          "translation": "Chúng ta có thể sử dụng những hình ảnh này để giúp khám phá thế giới của mình.",
          "audio": `${audioBase}/reading_10.wav`
        }
      ]
    },
    {
      "slug": "see_photo_and_answer",
      "section": "See photo and answer",
      "type": "FunFact",
      "content": [
        {
          "text": "This is a photo of the world. You can see the seven continents. Do you know their names?",
          "translation": "Đây là bức ảnh của Trái Đất. Bạn có thể thấy bảy châu lục. Bạn có biết tên của chúng không?",
          "audio": `${audioBase}/unit2_seven_continents.wav`,
          "image": `${imageBase}/unit2_seven_continents.jpg`
        },
        {
          "text": "This is part of Asia, the biggest continent. Now we can see the countries clearly. Here we can see South Korea.",
          "translation": "Đây là một phần của châu Á – châu lục lớn nhất. Bây giờ chúng ta có thể nhìn rõ các quốc gia. Đây là Hàn Quốc.",
          "audio": `${audioBase}/the_biggest_continent.wav`,
          "image": `${imageBase}/the_biggest_continent.jpg`
        },
        {
          "text": "Now we can see one town. This is Pohang in South Korea. Look! Can you see two stadiums?",
          "translation": "Bây giờ chúng ta có thể thấy một thị trấn. Đây là Pohang ở Hàn Quốc. Nhìn kìa! Bạn có thấy hai sân vận động không?",
          "audio": `${audioBase}/Pohang_photo.wav`,
          "image": `${imageBase}/Pohang.jpg`
        }
      ]
    },
    {
      "slug": "true_false",
      "section": "Read. Check T for True and F for False",
      "type": "TrueFalse",
      "title": "Read. Check T for True and F for False",
      "image": `${imageBase}/unit2_satellite_map.jpg`,
      "questions": [
        {
          "question": "The gymnasium is next to the river.",
          "translation": "Nhà thể chất nằm cạnh con sông.",
          "audio": `${audioBase}/gymnasium_next_to_the_river.wav`,
          "correct_answer": "F"
        },
        {
          "question": "The sports stadium is between the gymnasium and the culture and art center.",
          "translation": "Sân vận động nằm giữa nhà thể chất và trung tâm văn hóa nghệ thuật.",
          "audio": `${audioBase}/sports_stadium_is_between.wav`,
          "correct_answer": "T"
        },
        {
          "question": "The park is next to the gymnasium.",
          "translation": "Công viên nằm cạnh nhà thể chất.",
          "audio": `${audioBase}/park_is_next_to.wav`,
          "correct_answer": "F"
        },
        {
          "question": "The gymnasium is near the swimming pool.",
          "translation": "Nhà thể chất nằm gần hồ bơi.",
          "audio": `${audioBase}/gymnasium_is_near.wav`,
          "correct_answer": "T"
        }
      ]
    },
    {
      "slug": "read_and_write",
      "section": "Write the words in order",
      "type": "Activity",
      "instruction": "Write the words in order from small to big.",
      "words": ["house", "street", "town", "country", "continent", "planet"],
      "input": {
        "placeholder": "small → ____ → ____ → ____ → ____ → ____ → big"
      },
      "correct_answers": ["house", "street", "town", "country", "continent", "planet"]
    },
    {
      "slug": "talk_about_your_town",
      "section": "Work with a partner",
      "type": "Activity",
      "instruction": "Work with a partner. You can use a photo or map to talk about your town.",
      "input": {
        "placeholder": "Describe your town..."
      }
    }
  ]
};
export const unit2WritingDataTS : Unit2WritingData = {
  "slug": "unit2_writing",
  "title": "Unit 2 – Writing",
  "sections": [
    {
      "slug": "read_about_my_special_place",
      "section": "Read",
      "type": "Reading",
      "title": "Read. We can use the word 'and' to connect two ideas. Underline the sentences with 'and' as you read.",
      "title_vi": "Đọc. Chúng ta có thể dùng từ 'and' để nối hai ý. Gạch chân các câu có từ 'and' khi bạn đọc.",
      "content": [
        {
          "sentence": "My special place in the world",
          "translation": "Nơi đặc biệt của tôi trên thế giới",
          "audio": `${audioBase}/My_Special_Place.wav`,
          "images": [
            `${imageBase}/special_place_1.jpg`,
            `${imageBase}/special_place_2.jpg`
          ]
        },
        {
          "sentence": "My name is Jan, and I live in a town in Poland called Kazimierz Dolny.",
          "translation": "Tên tôi là Jan, và tôi sống ở một thị trấn ở Ba Lan tên là Kazimierz Dolny.",
          "audio": `${audioBase}/My_name_is_Jan.wav`
        },
        {
          "sentence": "I have two favorite places!",
          "translation": "Tôi có hai nơi yêu thích!",
          "audio": `${audioBase}/I_have_two_favorite_place.wav`
        },
        {
          "sentence": "There is a hill by the town.",
          "translation": "Có một ngọn đồi gần thị trấn.",
          "audio": `${audioBase}/There_is_a_hill.wav`
        },
        {
          "sentence": "You can walk to the top of the hill, and from there you can see the whole town.",
          "translation": "Bạn có thể đi bộ lên đỉnh đồi, và từ đó bạn có thể nhìn thấy toàn bộ thị trấn.",
          "audio": `${audioBase}/You_can_walk_to_the_top.wav`
        },
        {
          "sentence": "It's beautiful, and it's very quiet.",
          "translation": "Nó thật đẹp, và rất yên tĩnh.",
          "audio": `${audioBase}/It_beautiful.wav`
        },
        {
          "sentence": "My second favorite place is the bakery!",
          "translation": "Nơi yêu thích thứ hai của tôi là tiệm bánh!",
          "audio": `${audioBase}/My_second_favorite_place.wav`
        },
        {
          "sentence": "My town is famous for its special bread.",
          "translation": "Thị trấn của tôi nổi tiếng với loại bánh mì đặc biệt.",
          "audio": `${audioBase}/My_town_is_famous.wav`
        },
        {
          "sentence": "The bakery makes bread in the shape of a chicken.",
          "translation": "Tiệm bánh làm bánh mì có hình con gà.",
          "audio": `${audioBase}/The_bakery_makes_bread.wav`
        },
        {
          "sentence": "It's delicious!",
          "translation": "Nó thật ngon!",
          "audio": `${audioBase}/It_delicious.wav`
        }
      ]
    },
    {
      "slug": "write_about_special_place",
      "section": "Write",
      "type": "Writing",
      "title": "Describe your special place in the world.",
      "title_vi": "Miêu tả nơi đặc biệt của bạn trên thế giới.",
      "instruction": "Write about your special place in the world.",
      "instruction_vi": "Viết về nơi đặc biệt của bạn trên thế giới.",
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
        "columns": ["Name", "Favorite place"],
        "columns_vi": ["Tên", "Nơi yêu thích"],
        "rows": [
          ["", ""],
          ["", ""]
        ]
      }
    }
  ]
};

export const unit2Vocabulary1DataTS: Unit2Vocabulary1Data = {
  "slug": "unit2_vocabulary1",
  "unit": "Unit 2 – Places in the City",
  "title": "VOCABULARY 1 – City Places",
  "sections": [
    {
      "slug": "listen_and_read",
      "section": "Listen and Read",
      "type": "Vocabulary",
      "instruction": "Listen, read, and learn the words.",
      "words": [
        {
          "word": "a post office",
          "ipa": "/ə pəʊst ˈɒfɪs/",
          "translation": "một bưu điện",
          "image": `${imageBase}/a_post_office.jpg`,
          "audio": `${audioBase}/a_post_office.wav`,
          "example": {
            "sentence": "You can send letters at the post office.",
            "translation": "Bạn có thể gửi thư ở bưu điện.",
            "audio": `${audioBase}/you_can_send_letters_at_the_post_office.wav`
          }
        },
        {
          "word": "a museum",
          "ipa": "/ə mjuːˈziːəm/",
          "translation": "một viện bảo tàng",
          "image": `${imageBase}/a_museum.jpg`,
          "audio": `${audioBase}/a_museum.wav`,
          "example": {
            "sentence": "We can see old paintings at the museum.",
            "translation": "Chúng tôi có thể xem những bức tranh cổ ở viện bảo tàng.",
            "audio": `${audioBase}/we_can_see_old_paintings_at_the_museum.wav`
          }
        },
        {
          "word": "a hospital",
          "ipa": "/ə ˈhɒspɪtl/",
          "translation": "một bệnh viện",
          "image": `${imageBase}/a_hospital.jpg`,
          "audio": `${audioBase}/a_hospital.wav`,
          "example": {
            "sentence": "A doctor works at the hospital.",
            "translation": "Bác sĩ làm việc ở bệnh viện.",
            "audio": `${audioBase}/a_doctor_works_at_the_hospital.wav`
          }
        },
        {
          "word": "a bakery",
          "ipa": "/ə ˈbeɪkəri/",
          "translation": "một tiệm bánh",
          "image": `${imageBase}/a_bakery.jpg`,
          "audio": `${audioBase}/a_bakery.wav`,
          "example": {
            "sentence": "You can buy bread at the bakery.",
            "translation": "Bạn có thể mua bánh mì ở tiệm bánh.",
            "audio": `${audioBase}/you_can_buy_bread_at_the_bakery.wav`
          }
        },
        {
          "word": "a restaurant",
          "ipa": "/ə ˈrestrɒnt/",
          "translation": "một nhà hàng",
          "image": `${imageBase}/a_restaurant.jpg`,
          "audio": `${audioBase}/a_restaurant.wav`,
          "example": {
            "sentence": "We eat food at a restaurant.",
            "translation": "Chúng tôi ăn ở nhà hàng.",
            "audio": `${audioBase}/we_eat_food_at_a_restaurant.wav`
          }
        },
        {
          "word": "a supermarket",
          "ipa": "/ə ˈsuːpəmɑːkɪt/",
          "translation": "một siêu thị",
          "image": `${imageBase}/a_supermarket.jpg`,
          "audio": `${audioBase}/a_supermarket.wav`,
          "example": {
            "sentence": "My mom buys vegetables at the supermarket.",
            "translation": "Mẹ tôi mua rau ở siêu thị.",
            "audio": `${audioBase}/my_mom_buys_vegetables_at_the_supermarket.wav`
          }
        },
        {
          "word": "a drugstore",
          "ipa": "/ə ˈdrʌɡstɔː/",
          "translation": "một hiệu thuốc",
          "image": `${imageBase}/a_drugstore.jpg`,
          "audio": `${audioBase}/a_drugstore.wav`,
          "example": {
            "sentence": "You can get medicine at the drugstore.",
            "translation": "Bạn có thể mua thuốc ở hiệu thuốc.",
            "audio": `${audioBase}/you_can_get_medicine_at_the_drugstore.wav`
          }
        },
        {
          "word": "a train station",
          "ipa": "/ə treɪn ˈsteɪʃn/",
          "translation": "một nhà ga",
          "image": `${imageBase}/a_train_station.jpg`,
          "audio": `${audioBase}/a_train_station.wav`,
          "example": {
            "sentence": "We wait for the train at the train station.",
            "translation": "Chúng tôi đợi tàu ở nhà ga.",
            "audio": `${audioBase}/we_wait_for_the_train_at_the_train_station.wav`
          }
        },
        {
          "word": "a movie theater",
          "ipa": "/ə ˈmuːvi ˈθɪətə/",
          "translation": "một rạp chiếu phim",
          "image": `${imageBase}/a_movie_theater.jpg`,
          "audio": `${audioBase}/a_movie_theater.wav`,
          "example": {
            "sentence": "We can watch movies at the movie theater.",
           "translation": "Chúng tôi có thể xem phim ở rạp chiếu phim.",
            "audio": `${audioBase}/we_can_watch_movies_at_the_movie_theater.wav`
          }
        },
        {
          "word": "a toy store",
          "ipa": "/ə tɔɪ stɔː/",
          "translation": "một cửa hàng đồ chơi",
          "image": `${imageBase}/a_toy_store.jpg`,
          "audio": `${audioBase}/a_toy_store.wav`,
          "example": {
            "sentence": "I buy a toy car at the toy store.",
            "translation": "Tôi mua một chiếc xe đồ chơi ở cửa hàng đồ chơi.",
            "audio": `${audioBase}/i_buy_a_toy_car_at_the_toy_store.wav`
          }
        },
        {
          "word": "a police station",
          "ipa": "/ə pəˈliːs ˈsteɪʃn/",
          "translation": "một đồn cảnh sát",
          "image": `${imageBase}/a_police_station.jpg`,
          "audio": `${audioBase}/a_police_station.wav`,
          "example": {
            "sentence": "A police officer works at the police station.",
            "translation": "Cảnh sát làm việc ở đồn cảnh sát.",
            "audio": `${audioBase}/a_police_officer_works_at_the_police_station.wav`
          }
        }
      ]
    },
    {
      "slug": "describe_and_guess",
      "section": "Describe and Guess",
      "type": "Speaking",
      "instruction": "Listen, describe, and guess the place.",
      "word_box": [
        { "word": "bread", "audio": `${audioBase}/bread.wav` },
        { "word": "a doctor", "audio": `${audioBase}/a_doctor.wav` },
        { "word": "food", "audio": `${audioBase}/food.wav` },
        { "word": "movies", "audio": `${audioBase}/movies.wav` },
        { "word": "paintings", "audio": `${audioBase}/paintings.wav` },
        { "word": "a police officer", "audio": `${audioBase}/a_police_officer.wav` },
        { "word": "a swing", "audio": `${audioBase}/a_swing.wav` }
      ],
      "examples": [
        {
          "description": "You can buy bread here.",
          "answer": "a bakery",
          "audio": `${audioBase}/you_can_buy_bread_here.wav`,
          "image": `${imageBase}/a_bakery.jpg`
        },
        {
          "description": "You can see paintings here.",
          "answer": "a museum",
          "audio": `${audioBase}/you_can_see_paintings_here.wav`,
          "image": `${imageBase}/a_museum.jpg`
        },
        {
          "description": "A doctor works here.",
          "answer": "a hospital",
          "audio": `${audioBase}/a_doctor_works_here.wav`,
          "image": `${imageBase}/a_hospital.jpg`
        },
        {
          "description": "You play a swing here.",
          "answer": "a park",
          "audio": `${audioBase}/you_play_a_swing_here.wav`,
          "image": `${imageBase}/a_park.jpg`
        },
        {
          "description": "You can eat food here.",
          "answer": "a restaurant",
          "audio": `${audioBase}/you_can_eat_food_here.wav`,
          "image": `${imageBase}/a_restaurant.jpg`
        },
        {
          "description": "A police officer works here.",
          "answer": "a police station",
          "audio": `${audioBase}/a_police_officer_works_here.wav`,
          "image": `${imageBase}/a_police_station.jpg`
        },
        {
          "description": "You can watch movies here.",
          "answer": "a movie theater",
          "audio": `${audioBase}/you_can_watch_movies_here.wav`,
          "image": `${imageBase}/a_movie_theater.jpg`
        }
      ]
    }
  ]
};
export const unit2SongDataTS: Unit2SongData = {
  "song_name": "A Great New Town Song",
  "unit": "Unit 2 - A Great New Town",
  "audio":`${audioBase}/a_great_new_town_song.wav`,
  "type": "song",
  "lyrics": [
    "A Great New Town",
    "Can I help you? You look lost.",
    "Can I help you find your way?",
    "Can I help you? You look lost.",
    "Can I help you today?",
    "",
    "CHORUS",
    "I'm new in town. I think I'm lost.",
    "Can you help me find my way?",
    "I'm new in town.",
    "Can you help me with my busy day?",
    "",
    "Where are the post office, the toy store.",
    "the supermarket, and the park?",
    "Where's the bakery?",
    "Where's the library?",
    "Where are the zoo, the school, and a swimming pool?",
    "",
    "CHORUS",
    "",
    "I can help you. You're not lost",
    "I can help you find your way.",
    "I can help you. You're not lost.",
    "I can help you today.",
    "",
    "Here's the post office,",
    "the toy store, the supermarket,",
    "and the park.",
    "Here's the bakey, the ;ibrary, the zoom",
    "the school, and a swimming pool",
    "and a movie theater, too!",
    "",
    "I can help you. You're not lost.",
    "I can help you today.",
    "I can help you find your way, and you'll be OK,",
    "in your great new town today!",   
    "",
    "Thank you for helping me to find my way",
    "Thank you for helping me with my busy day,",
    "in my great new town today!",
    "in my great new town today!"
  ]
}
export const unit2Grammar1DataTS: Unit2Grammar1Data ={
  "slug": "unit2_grammar1",
  "title": "Unit 2 – Grammar 1",
  "sections": [
    {
      "slug": "can_for_requests_and_offers",
      "section": "Grammar: Can for Requests and Offers",
      "type": "Grammar",
      "instruction": "Read and listen to the examples.",
      "examples": [
        {
          "sentence": "Can you help me?",
          "translation": "Bạn có thể giúp tôi không?",
          "audio": `${audioBase}/can_you_help_me.wav`
        },
        {
          "sentence": "Sure",
          "translation": "Tôi có thể xin ít nước được không?",
          "audio":`${audioBase}/sure.wav`
        }
        ,
        {
          "sentence": "How can I help?",
          "translation": "Tôi có thể xin ít nước được không?",
          "audio": `${audioBase}/how_can_i_help.wav`
        }
      ]
    },
    {
      "slug": "read_look_match",
      "section": "Read, look and match",
      "type": "Matching",
      "instruction": "Match the sentences to the pictures.",
      "image": "/images/unit2/matching_scene.jpg",
      "left_column": ["Can you help me?", "Where's the park?","Where's the toy store?","Where's the museum?","Where's the movie theater?","Can you help me find the drug store?"],
      "right_column": ["It's on the corner of Main Street.It's next to the bakery.", "I'm sorry. I don't know where it is.","It's across from the supermarket.","It's behind the hospital.","Yes, of course. How can I help?","It's betwween the hospital and the supermarket."],
      "correct_answers": [
        { "left": "Can you help me?", "right": "Yes, of course. How can I help?", "audio": `${audioBase}/Can_you_help_meQA.wav` },
        { "left": "Where's the park?", "right": "It's behind the hospital", "audio": `${audioBase}/Where_the_parkQA.wav` },
        { "left": "Where's the toy store?", "right": "It's betwween the hospital and the supermarket.", "audio": `${audioBase}/"Where_the_toy_storeQA.wav` },
        { "left": "Where's the museum?", "right": "It's on the corner of Main Street.It's next to the bakery.", "audio": `${audioBase}/Where_the_museumQA.wav` },
        { "left": "Where's the movie theater?", "right": "It's across from the supermarket.", "audio": `${audioBase}/Where_the_movie_theaterQA.wav` },
        { "left": "Can you help me find the drug store?", "right": "I'm sorry. I don't know where it is.", "audio": `${audioBase}/Can_you_help_me_find_the_drug_storeQA.wav` }
      ]
    },
    {
      "slug": "write_more_questions",
      "section": "Write more questions",
      "type": "Writing",
      "instruction": "Write two more polite requests using 'Can'.",
      "input_placeholder": "Example: Can you help me ?"
    },
    {
      "slug": "ask_and_answer",
      "section": "Ask and answer",
      "type": "Speaking",
      "instruction": "Work with a partner. Ask and answer using 'Can'.",
      "input_placeholder": "Example: Can I help me?"
    }
  ]
}
export const unit2Vocabulary2DataTS: Unit2Vocabulary2Data ={
  "slug": "unit2_vocabulary2",
  "title": "Unit 2 – Vocabulary 2",
  "sections": [
    {
      "slug": "listen_and_say",
      "section": "Listen and Say",
      "type": "Vocabulary",
      "instruction": "Listen, point, and say the words.",
      "words": [
        {
          "word": "a library",
          "ipa": "/ə ˈlaɪ.brer.i/",
          "translation": "thư viện",
          "image": `${imageBase}/a_library.jpg`,
          "audio": `${audioBase}/a_library.wav`,
          "example": {
            "sentence": "He wants to go to the library.",
            "translation": "Cậu ấy muốn đến thư viện.",
            "audio": `${audioBase}/library_example.wav`
          }
        },
        {
          "word": "a swimming pool",
          "ipa": "/ˈswɪm.ɪŋ puːl/",
          "translation": "hồ bơi",
          "image": `${imageBase}/a_swimming_pool.jpg`,
          "audio": `${audioBase}/a_swimming_pool.wav`,
          "example": {
            "sentence": "I want to go to the swimming pool.",
            "translation": "Tôi muốn đi bơi ở hồ bơi.",
            "audio": `${audioBase}/swimming_pool_example.wav`
          }
        },
        {
          "word": "a zoo",
          "ipa": "/zuː/",
          "translation": "sở thú",
          "image": `${imageBase}/a_zoo.jpg`,
          "audio": `${audioBase}/a_zoo.wav`,
          "example": {
            "sentence": "We all want to go to the zoo.",
            "translation": "Chúng tôi đều muốn đi sở thú.",
            "audio": `${audioBase}/zoo_example.wav`
          }
        },
        {
          "word": "a mall",
          "ipa": "/mɔːl/",
          "translation": "trung tâm thương mại",
          "image": `${imageBase}/a_mall.jpg`,
          "audio": `${audioBase}/a_mall.wav`,
          "example": {
            "sentence": "I want to go to the mall.",
            "translation": "Tôi muốn đi trung tâm thương mại.",
            "audio": `${audioBase}/mall_example.wav`
          }
        },
        {
          "word": "a stadium",
          "ipa": "/ˈsteɪ.di.əm/",
          "translation": "sân vận động",
          "image": `${imageBase}/a_stadium.jpg`,
          "audio": `${audioBase}/a_stadium.wav`,
          "example": {
            "sentence": "They want to go to the stadium.",
            "translation": "Họ muốn đến sân vận động.",
            "audio": `${audioBase}/stadium_example.wav`
          }
        }
      ]
    },
    {
      "slug": "fill_in_the_blanks",
      "section": "Listen and Write",
      "type": "Writing",
      "instruction": "Listen and write the correct words.",
      "sentences": [
        {
          "sentence": "Min wants to go to the __. She loves the crocodiles and the monkeys.",
          "translation": "Min muốn đến sở thú. Cô ấy thích cá sấu và khỉ.",
          "answer": "zoo",
          "audio": `${audioBase}/min_wants_to_go_zoo.wav`
        },
        {
          "sentence": "Aziz wants to go to the __. He likes to see his favorite soccer team.",
          "translation": "Aziz muốn đến sân vận động. Cậu ấy thích xem đội bóng yêu thích của mình.",
          "answer": "stadium",
          "audio": `${audioBase}/aziz_wants_to_go_stadium.wav`
        },
        {
          "sentence": "Janica wants to go to the __. She has a new bathing suit.",
          "translation": "Janica muốn đến hồ bơi. Cô ấy có một bộ đồ bơi mới.",
          "answer": "swimming pool",
          "audio": `${audioBase}/janica_wants_to_go_swimming_pool.wav`
        },
        {
          "sentence": "Mounira wants to go to the __. She wants to buy some new clothes.",
          "translation": "Mounira muốn đến trung tâm thương mại. Cô ấy muốn mua vài bộ quần áo mới.",
          "answer": "mall",
          "audio": `${audioBase}/mounira_wants_to_go_mall.wav`
        },
        {
          "sentence": "Leo wants to go to the __. He wants to read some books.",
          "translation": "Leo muốn đến thư viện. Cậu ấy muốn đọc vài quyển sách.",
          "answer": "library",
          "audio": `${audioBase}/leo_wants_to_go_library.wav`
        }
      ]
    }
  ]
}

export const unit2Grammar2DataTS: Unit2Grammar2Data = {
  "slug": "unit2_grammar2",
  "title": "GRAMMAR 2 – Giving Directions",
  "sections": [
    {
      "slug": "giving_directions",
      "section": "Giving Directions",
      "instruction": "Listen and repeat. Practice saying directions.",
      "examples": [
        {
          "sentence": "How can I get to the drug store?",
          "translation": "Làm sao tôi đến được tiệm thuốc?",
          "audio": `${audioBase}/how_can_i_get_to_the_drug_store.wav`
        },
        {
          "sentence": "Go straight.",
          "translation": "Đi thẳng.",
          "audio": `${audioBase}/go_straight.wav`
        },
        {
          "sentence": "Turn left on Third Avenue.",
          "translation": "Rẽ trái ở Đại lộ Ba.",
          "audio": `${audioBase}/turn_left_on_third_avenue.wav`
        },
        {
          "sentence": "Turn right at the supermarket.",
          "translation": "Rẽ phải ở siêu thị.",
          "audio": `${audioBase}/turn_right_at_the_supermarket.wav`
        }
      ]
    },
    {
      "slug": "look_at_map_follow_write",
      "section": "Follow and Write",
      "instruction": "Look at the map. Complete the sentences.",
      "image": `${imageBase}/unit2_map_directions.jpg`,
      "sentences": [
        {
          "sentence": "How can I get to the __? Turn left on Summer Street. Go straight. Turn right on Spring Street. It's next to the mall.",
          "translation": "Làm sao tôi đến được __? Rẽ trái ở đường Summer. Đi thẳng. Rẽ phải ở đường Spring. Nó ở cạnh trung tâm thương mại.",
          "answer": "museum",
          "audio": `${audioBase}/how_can_i_get_to_the_museum.wav`
        },
        {
          "sentence": "How __? Go straight on Green Street. Turn left on Middle Street. It's on the corner of Middle Street and Second Avenue.",
          "translation": "Làm __? Đi thẳng trên đường Green. Rẽ trái ở đường Middle. Nó ở góc giao giữa đường Middle và Đại lộ Hai.",
          "answer": "can I get to the school",
          "audio": `${audioBase}/how_can_i_get_to_the_school.wav`
        },
        {
          "sentence": "How __? Go straight on Green Street. Turn right on Middle Street. Turn left on Black Street. It's next to the swimming pool.",
          "translation": "Làm __? Đi thẳng trên đường Green. Rẽ phải ở đường Middle. Rẽ trái ở đường Black. Nó ở cạnh hồ bơi.",
          "answer": "can I get to the restaurant",
          "audio": `${audioBase}/how_can_i_get_to_the_restaurant.wav`
        },
        {
          "sentence": "How __? Turn left on Summer Street. Turn right on Second Avenue. Go straight on to Sunny Street. It's next to the book store.",
          "translation": "Làm __? Rẽ trái ở đường Summer. Rẽ phải ở Đại lộ Hai. Đi thẳng tới đường Sunny. Nó ở cạnh hiệu sách.",
          "answer": "can I get to the zoo",
          "audio": `${audioBase}/how_can_i_get_to_the_zoo.wav`
        }
      ]
    },
    {
      "slug": "play_a_game",
      "section": "Play a Game",
      "instruction": "Look at the pictures and write where the places are.",
      "images": [
        `${imageBase}/unit2_map_directions.jpg`,
        `${imageBase}/unit2/park.png`,
        `${imageBase}/unit2/bank.png`,
        `${imageBase}/unit2/library.png`
      ],
      "inputs": [
        { "placeholder": "The school is next to the park." },
        { "placeholder": "The bank is across from the school." },
        { "placeholder": "The library is between the school and the park." }
      ]
    }
  ]
};
