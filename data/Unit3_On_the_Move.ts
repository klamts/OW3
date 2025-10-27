import {
  Unit3Vocabulary1Data,
  Unit3SongData,
  Unit3Grammar1Data,
  Unit3Vocabulary2Data,
  Unit3Grammar2Data,
  Unit3ReadingData,
  Unit3WritingData,
  UnitData
} from "./type";
const audioBase = "https://raw.githubusercontent.com/klamts/Unit3_On_the_Move/main";
const imageBase = "https://raw.githubusercontent.com/klamts/images/main";

export const unit3Vocabulary1DataTS: Unit3Vocabulary1Data = {
  "slug": "unit3_vocabulary1",
  "unit": "Unit 3 – On the Move!",
  "title": "VOCABULARY 1 – On the Move",
  "sections": [
    {
      "slug": "listen_and_read",
      "section": "Listen and Read",
      "type": "Vocabulary",
      "instruction": "Listen, read, and learn the words.",
      "words": [
        {
          "word": "a sailboat",
          "ipa": "/ˈseɪl.boʊt/",
          "translation": "một chiếc thuyền buồm",
          "image": `${imageBase}/a sailboat.jpg`,
          "audio": `${audioBase}/a_sailboat.wav`,
          "example": {
            "sentence": "That sailboat is fast.",
            "translation": "Chiếc thuyền buồm đó chạy nhanh.",
            "audio": `${audioBase}/that_sailboat_is_fast.wav`
          }
        },
        {
          "word": "a helicopter",
          "ipa": "/ˈhelɪˌkɒptər/",
          "translation": "một chiếc trực thăng",
          "image": `${imageBase}/a helicopter.jpg`,
          "audio": `${audioBase}/a_helicopter.wav`,
          "example": {
            "sentence": "That helicopter is really loud.",
            "translation": "Chiếc trực thăng đó thật ồn ào.",
            "audio": `${audioBase}/that_helicopter_is_really_loud.wav`
          }
        },
        {
          "word": "a bus",
          "ipa": "/bʌs/",
          "translation": "một chiếc xe buýt",
          "image": `${imageBase}/a bus.jpg`,
          "audio": `${audioBase}/a_bus.wav`,
          "example": {
            "sentence": "We take the bus to school.",
            "translation": "Chúng tôi đi học bằng xe buýt.",
            "audio": `${audioBase}/we_take_the_bus_to_school.wav`
          }
        },
        {
          "word": "an airplane",
          "ipa": "/ˈerpleɪn/",
          "translation": "một chiếc máy bay",
          "image": `${imageBase}/an airplane.jpg`,
          "audio": `${audioBase}/an_airplane.wav`,
          "example": {
            "sentence": "Can you see an airplane in the sky?",
            "translation": "Bạn có thấy chiếc máy bay trên bầu trời không?",
            "audio": `${audioBase}/can_you_see_an_airplane_in_the_sky.wav`
          }
        },
        {
          "word": "a ferry",
          "ipa": "/ˈferi/",
          "translation": "một chiếc phà",
          "image": `${imageBase}/a ferry.jpg`,
          "audio": `${audioBase}/a_ferry.wav`,
          "example": {
            "sentence": "Look at all the cars on the ferry.",
            "translation": "Nhìn kìa, có nhiều ô tô trên chiếc phà.",
            "audio": `${audioBase}/look_at_all_the_cars_on_the_ferry.wav`
          }
        },
        {
          "word": "a subway",
          "ipa": "/ˈsʌbweɪ/",
          "translation": "một tàu điện ngầm",
          "image": `${imageBase}/a subway.jpg`,
          "audio": `${audioBase}/a_subway.wav`,
          "example": {
            "sentence": "Let's take the subway to the museum.",
            "translation": "Hãy đi tàu điện ngầm đến viện bảo tàng nhé.",
            "audio": `${audioBase}/lets_take_the_subway_to_the_museum.wav`
          }
        },
        {
          "word": "a hot air balloon",
          "ipa": "/hɒt eər bəˈluːn/",
          "translation": "một khinh khí cầu",
          "image": `${imageBase}/a hot air balloon.jpg`,
          "audio": `${audioBase}/a_hot_air_balloon.wav`,
          "example": {
            "sentence": "Look, that hot air balloon is very colorful.",
            "translation": "Nhìn kìa, chiếc khinh khí cầu đó rất nhiều màu sắc.",
            "audio": `${audioBase}/look_that_hot_air_balloon_is_very_colorful.wav`
          }
        },
        {
          "word": "a scooter",
          "ipa": "/ˈskuːtər/",
          "translation": "một chiếc xe tay ga",
          "image": `${imageBase}/a scooter.jpg`,
          "audio": `${audioBase}/a_scooter.wav`,
          "example": {
            "sentence": "I ride my scooter in the park.",
            "translation": "Tôi chạy xe tay ga trong công viên.",
            "audio": `${audioBase}/i_ride_my_scooter_in_the_park.wav`
          }
        },
        {
          "word": "a taxi",
          "ipa": "/ˈtæksi/",
          "translation": "một chiếc taxi",
          "image": `${imageBase}/a taxi.jpg`,
          "audio": `${audioBase}/a_taxi.wav`,
          "example": {
            "sentence": "My uncle drives a taxi.",
            "translation": "Chú tôi lái taxi.",
            "audio": `${audioBase}/my_uncle_drives_a_taxi.wav`
          }
        },
        {
          "word": "a ship",
          "ipa": "/ʃɪp/",
          "translation": "một con tàu",
          "image": `${imageBase}/a ship.jpg`,
          "audio": `${audioBase}/a_ship.wav`,
          "example": {
            "sentence": "That's a big ship.",
            "translation": "Đó là một con tàu lớn.",
            "audio": `${audioBase}/thats_a_big_ship.wav`
          }
        },
        {
          "word": "a motorcycle",
          "ipa": "/ˈmoʊtərˌsaɪkl/",
          "translation": "một chiếc xe mô tô",
          "image": `${imageBase}/a motorcycle.jpg`,
          "audio": `${audioBase}/a_motorcycle.wav`,
          "example": {
            "sentence": "I want to ride a motorcycle.",
            "translation": "Tôi muốn lái một chiếc mô tô.",
            "audio": `${audioBase}/i_want_to_ride_a_motorcycle.wav`
          }
        }
      ]
    },
    {
      "slug": "describe_and_guess",
      "section": "Describe and Guess",
      "type": "Speaking",
      "instruction": "Listen, describe, and guess the vehicle.",
      "examples": [
        {
          "description": "It's in the water.",
          "answer": "Is it a sailboat?",
          "audio": `${audioBase}/its_in_the_water.wav`,
          "image": `${imageBase}/a sailboat.jpg`
        },
        {
          "description": "It's in the sky.",
          "answer": "Is it an airplane?",
          "audio": `${audioBase}/its_in_the_sky.wav`,
          "image": `${imageBase}/an airplane.jpg`
        },
        {
          "description": "It's on the road.",
          "answer": "Is it a bus?",
          "audio": `${audioBase}/its_on_the_road.wav`,
          "image": `${imageBase}/a bus.jpg`
        }
      ]
    }
  ]
};
export const unit3SongDataTS: Unit3SongData = {
  "song_name": "How Do You Get to School?",
  "unit": "Unit 3 - How Do You Get to School?",
  "audio":`${audioBase}/how_do_you_get_to_school.wav`,
  "type": "song",
  "lyrics": [
    "How Do You Get to School?",
    "CHORUS",
    "How do you get to school?",
    "How do you get to school?",
    "How do you get to school?",
    "How do you get to school?",
    "",
    "I take the bus to school.",
    "I do,too.",
    "I ride my bike to school.",
    "I do, too.",
    "",
    "CHORUS",
    "",
    "My mom drives me to school.",
    "My mom does, too",
    "I coast downhill to school",
    "I do, too",
    "",
    "CHORUS",
    "",
    "Listen and I'll tell you",
    "Listen and I'll tell you",
    "Listen and I'll tell you",
    "how I get to school.",
    "",
    "I take a feery to school. Yes, I do.",
    "I take a feery to school. Do you take one, too?",
    "",
    "I take the subway to school. Yes, I do.",
    "I take the subway to school. Do you take it. too?",
    "CHORUS"
    
  ]
}
export const Unit3Grammar1DataTS: Unit3Grammar1Data = {
  "slug": "unit3_grammar1",
  "unit": "Unit 3 – Grammar 1",
  "title": "GRAMMAR 1 – Too / for agreeing",
  "sections": [
    {
      "slug": "too_for_agreeing",
      "type": "Grammar",
      "section": "Too for agreeing",
      "instruction": "Listen and repeat. Practice the sentences.",
      "instruction_vn": "Nghe và lặp lại. Luyện tập các câu sau.",
      "examples": [
        {
          "en": "I ride my scooter to school. I do, too.",
          "vi": "Tôi đi học bằng xe trượt. Tôi cũng vậy.",
          "audio": `${audioBase}/grammar1_ride_scooter.wav`
        },
        {
          "en": "I take the bus to school. I don't. I take the subway.",
          "vi": "Tôi đi học bằng xe buýt. Tôi thì không. Tôi đi tàu điện ngầm.",
          "audio": `${audioBase}/grammar1_take_bus.wav`
        },
        {
          "en": "My brother rides his bike to school. My brother does, too.",
          "vi": "Anh trai tôi đi học bằng xe đạp. Anh tôi cũng vậy.",
          "audio": `${audioBase}/grammar1_brother_bike.wav`
        },
        {
          "en": "My sister rides her skateboard to school. My sister doesn't. She walks.",
          "vi": "Em gái tôi đi học bằng ván trượt. Em tôi thì không. Cô ấy đi bộ.",
          "audio": `${audioBase}/grammar1_sister_skateboard.wav`
        }
      ]
    },
    {
      "slug": "read_and_write",
      "type": "Activity",
      "section": "Read and Write",
      "instruction": "Read the question. Write a sentence with do, don't, does, or doesn't.",
      "instruction_vn": "Đọc câu hỏi. Viết câu trả lời với do, don't, does, hoặc doesn't.",
      "questions": [
        {
          "question": "I take the bus to school.",
          "answer": "I don't. I ride my bike.",
          "audio": `${audioBase}/grammar1_q1.wav`
        },
        {
          "question": "My sister rides her bike every day.",
          "answer": "My sister doesn't. She rides her scooter after school.",
          "audio": `${audioBase}/grammar1_q2.wav`
        },
        {
          "question": "My cousins go on vacation by airplane every summer.",
          "answer": "They don't. They go by car.",
          "audio": `${audioBase}/grammar1_q3.wav`
        },
        {
          "question": "I take my dog to the park every day.",
          "answer": "I do, too.",
          "audio": `${audioBase}/grammar1_q4.wav`
        }
      ]
    },
    {
      "slug": "listen_and_check",
      "type": "Listening",
      "section": "Listen and Check",
      "instruction": "Listen and check (✓) the correct boxes.",
      "instruction_vn": "Nghe và đánh dấu (✓) vào ô đúng.",
      "audio": `${audioBase}/grammar1_listen_check.wav`,
      "table": {
        "columns": ["Name", "Scooter", "Bus", "Walk", "Bike"],
        "rows": [
          { "Name": "Miguel", "Scooter": "", "Bus": "", "Walk": "", "Bike": "" },
          { "Name": "Carlos", "Scooter": "", "Bus": "", "Walk": "", "Bike": "" },
          { "Name": "Fernanda", "Scooter": "", "Bus": "", "Walk": "", "Bike": "" },
          { "Name": "Rosario", "Scooter": "", "Bus": "", "Walk": "", "Bike": "" },
          { "Name": "Tomas", "Scooter": "", "Bus": "", "Walk": "", "Bike": "" },
          { "Name": "Graciela", "Scooter": "", "Bus": "", "Walk": "", "Bike": "" }
        ]
      }
    },
    {
      "slug": "look_and_write",
      "type": "Writing",
      "section": "Look. Write sentences about Marco's survey.",
      "instruction": "Write sentences using the information from Marco’s survey.",
      "instruction_vn": "Viết câu dựa vào kết quả khảo sát của Marco.",
      "example": {
        "en": "Tomas walks to school. Fernanda doesn’t. She takes the bus.",
        "vi": "Tomas đi bộ đến trường. Fernanda thì không. Cô ấy đi xe buýt.",
        "audio": `${audioBase}/grammar1_example_marco.wav`
      },
      "inputs": [
        { "placeholder": "Write your sentence 1..." },
        { "placeholder": "Write your sentence 2..." },
        { "placeholder": "Write your sentence 3..." }
      ]
    },
    {
      "slug": "talk_about_you",
      "type": "Speaking",
      "section": "Talk about you and your friends",
      "instruction": "Work with a partner. Ask and answer questions.",
      "instruction_vn": "Làm việc theo cặp. Hỏi và trả lời các câu hỏi.",
      "examples": [
        {
          "question": "How do you get to school? ",
          "answer": "I ride my bike.",
          "question_vi": "Bạn đi học bằng cách nào?",
          "answer_vi": "Mình đi học bằng xe đạp.",
          "audio_question": `${audioBase}/Qgrammar1_talk1.wav`,
          "audio_answer": `${audioBase}/Agrammar1_talk1.wav`
        },
        {
          "question": "Do you walk to school?",
          "answer":"No, I take the bus.",
          "question_vi": "Bạn có đi bộ đến trường không? ",
          "answer_vi": "Không, mình đi xe buýt.",
          "audio_question": `${audioBase}/Qgrammar1_talk2.wav`,
          "audio_answer": `${audioBase}/Agrammar1_talk2.wav`
        }
      ]
    }
  ]
};
export const unit3Vocabulary2DataTS: Unit3Vocabulary2Data = {
  "slug": "unit3_vocabulary2",
  "title": "Unit 3 – Vocabulary 2",
  "sections": [
    {
      "slug": "listen_and_say",
      "section": "Listen and Say",
      "type": "Vocabulary",
      "instruction": "Listen, point, and say the words.",
      "words": [
        {
          "word": "get on",
          "ipa": "/ɡet ɒn/",
          "translation": "lên (xe, xe đạp, tàu...)",
          "image": `${imageBase}/get on.jpg`,
          "audio": `${audioBase}/get_on.wav`,
          "example": {
            "sentence": "I get on my bike.",
            "translation": "Tôi leo lên xe đạp của mình.",
            "audio": `${audioBase}/get_on_example.wav`
          }
        },
        {
          "word": "pedal uphill",
          "ipa": "/ˈped.əl ˈʌp.hɪl/",
          "translation": "đạp xe lên dốc",
          "image": `${imageBase}/pedal uphill.jpg`,
          "audio": `${audioBase}/pedal_uphill.wav`,
          "example": {
            "sentence": "I pedal uphill every morning.",
            "translation": "Tôi đạp xe lên dốc mỗi sáng.",
            "audio": `${audioBase}/pedal_uphill_example.wav`
          }
        },
        {
          "word": "coast downhill",
          "ipa": "/koʊst ˈdaʊn.hɪl/",
          "translation": "thả trôi xe xuống dốc",
          "image": `${imageBase}/coast downhill.jpg`,
          "audio": `${audioBase}/coast_downhill.wav`,
          "example": {
            "sentence": "I coast downhill very fast.",
            "translation": "Tôi thả xe xuống dốc rất nhanh.",
            "audio": `${audioBase}/coast_downhill_example.wav`
          }
        },
        {
          "word": "get off",
          "ipa": "/ɡet ɒf/",
          "translation": "xuống xe, rời khỏi xe",
          "image": `${imageBase}/get off.jpg`,
          "audio": `${audioBase}/get_off.wav`,
          "example": {
            "sentence": "I get off my bike at school.",
            "translation": "Tôi xuống xe đạp khi đến trường.",
            "audio": `${audioBase}/get_off_example.wav`
          }
        },
        {
          "word": "park",
          "ipa": "/pɑːk/",
          "translation": "đỗ xe, gửi xe",
          "image": `${imageBase}/park.jpg`,
          "audio": `${audioBase}/park.wav`,
          "example": {
            "sentence": "I park my bike in front of the house.",
            "translation": "Tôi đỗ xe đạp trước nhà.",
            "audio": `${audioBase}/park_example.wav`
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
          "sentence": "After school I ___ my bike and I ride home.I can ride home in fifteen minutes",
          "translation": "Sau giờ học, tôi ___ xe đạp và Tôi đi xe về nhà. Tôi có thể đi xe về nhà trong mười lăm phút",
          "answer": "get on",
          "audio": `${audioBase}/fill_get_on.wav`
        },
        {
          "sentence": "I sometimes can ___, and I get tired, but at the top of the hill, you can see the whole town!",
          "translation": "Thỉnh thoảng tôi có thể đạp xe lên dốc, và tôi thấy mệt, nhưng ở trên đỉnh dốc, bạn có thể nhìn thấy toàn bộ thị trấn!",
          "answer": "pedal uphill",
          "audio": `${audioBase}/fill_pedal_uphill.wav`
        },
        {
          "sentence": "I like to ___, too. it can be very fast. You have to be careful.",
          "translation": "Tôi cũng thích thả trôi xe xuống dốc. Nó có thể rất nhanh, nên bạn phải cẩn thận.!",
          "answer": "coast downhill",
          "audio": `${audioBase}/fill_coast_downhill.wav`
        },
        {
          "sentence": "When I get home, I ___ my bike and ___ it. I'm usually hungry, so I have a snack ",
          "translation": "Khi tôi về đến nhà, tôi xuống xe và dựng xe lên.Tôi thường cảm thấy đói, nên tôi ăn nhẹ một chút",
          "answer": "get off, park",
          "audio": `${audioBase}/fill_get_off_park.wav`
        }
      ]
    }
  ]
};
export const unit3Grammar2DataTS: Unit3Grammar2Data = {
  "slug": "unit3_grammar2",
  "unit": "Unit 3 – Grammar 2",
  "section": "Grammar 2",
  "title": "BUT as a Contrast",
  "type": "Workbook",
  "sections": [
    {
      "section_name": "BUT as a Contrast",
      "instruction": "Listen and repeat.",
      "instruction_vn": "Nghe và lặp lại.",
      "type": "Grammar",
      "content": [
        {
          "sentence_en": "My mother takes the bus to work, but my father takes the subway.",
          "sentence_vn": "Mẹ tôi đi làm bằng xe buýt, nhưng cha tôi đi làm bằng tàu điện ngầm.",
          "audio": `${audioBase}/but_contrast_example.wav`
        }
      ]
    },
    {
      "section_name": "Look at the pictures and complete.",
      "instruction": "Look at the pictures and complete the sentences.Boy in left and Girl in right",
      "instruction_vn": "Quan sát hình và hoàn thành câu.",
      "type": "Activity",
      "layout": "2-column",
      "content": [
        {
          "image_left": `${imageBase}/boy_scooter.jpg`,
          "image_right": `${imageBase}/girl_bike.jpg`,
          "question": "The boy rides his scooter to school, ___",
          "answer": "but the girl rides her bike to school.",
          "audio_question": `${audioBase}/q1.wav`,
          "audio_answer": `${audioBase}/a1.wav`
        },
        {
          "image_left": `${imageBase}/boy_breakfast_730.jpg`,
          "image_right": `${imageBase}/girl_breakfast_8.jpg`,
          "question": "The girl eats breakfast at eight o’clock, ___",
          "answer": "but the boy eats breakfast at seven thirty.",
          "audio_question": `${audioBase}/q2.wav`,
          "audio_answer": `${audioBase}/a2.wav`
        },
        {
          "image_left": `${imageBase}/boy_rabbit.jpg`,
          "image_right": `${imageBase}/girl_dog.jpg`,
          "question": "The boy has a pet rabbit, ___",
          "answer": "but the girl has a pet dog.",
          "audio_question": `${audioBase}/q3.wav`,
          "audio_answer": `${audioBase}/a3.wav`
        },
        {
          "image_left": `${imageBase}/boy_singer.jpg`,
          "image_right": `${imageBase}/girl_vet.jpg`,
          "question": "He wants to be a singer, ___",
          "answer": "but she wants to be a vet.",
          "audio_question": `${audioBase}/q4.wav`,
          "audio_answer": `${audioBase}/a4.wav`
        },
        {
          "image_left": `${imageBase}/boy_hamburger.jpg`,
          "image_right": `${imageBase}/girl_spaghetti.jpg`,
          "question": "The girl likes spaghetti for lunch, ___",
          "answer": "but the boy likes hamburger for lunch.",
          "audio_question": `${audioBase}/q5.wav`,
          "audio_answer": `${audioBase}/a5.wav`
        }
      ]
    },
    {
      "section_name": "Play a game.",
      "instruction": "Cut out the cards in the back of the book. Play with a partner. Make sentences about the cards. Find and keep pairs.",
      "instruction_vn": "Cắt các thẻ ở cuối sách. Chơi cùng bạn. Nói câu về các thẻ. Tìm và giữ cặp phù hợp.",
      "type": "Game",
      "content": [
        {
          "example_1": {
            "sentence": "Jenny wants to fly in a hot air balloon.",
            "result": "No pair. Your turn!",
            "audio": `${audioBase}/game_example1.wav`
          },
          "example_2": {
            "sentence": "Jenny likes cereal for breakfast.",
            "result": "No pair. Your turn!",
            "audio": `${audioBase}/game_example2.wav`
          },
          "example_3": {
            "sentence": "Jenny likes to play tennis on Saturday, but Sam likes to play soccer on Saturdays.",
            "result": "Pair!",
            "audio": `${imageBase}/game_example3.wav`
          }
        }
      ]
    }
  ]
};


export const unit3ReadingDataTS: Unit3ReadingData = {
  "slug": "unit3_reading",
  "title": "Unit 3 – Reading",
  "sections": [
    {
      "slug": "listen_and_read",
      "section": "Listen and read",
      "type": "Reading",
      "instruction": "Listen and read about Hot Air Balloons.",
      "image": `${imageBase}/the International Balloon Fiesta.jpg`,
      "content": [
        {
          "sentence": "It's always exciting to see a colorful hot air balloon in the sky - but here there are hundreds!",
          "translation": "Luôn thật thú vị khi nhìn thấy một khinh khí cầu nhiều màu sắc trên bầu trời - nhưng ở đây có hàng trăm chiếc!",
          "audio": `${audioBase}/HotAirBalloon1.wav`
        },
        {
          "sentence": "In October of every year, balloonists gather at the International Balloon Fiesta in Albuquerque, USA.",
          "translation": "Vào tháng Mười hằng năm, những người điều khiển khinh khí cầu tập trung tại Lễ hội Khinh khí cầu Quốc tế ở Albuquerque, Mỹ.",
          "audio": `${audioBase}/HotAirBalloon2.wav`
        },
        {
          "sentence": "About 600 balloons are up in the sky at the same time!",
          "translation": "Khoảng 600 khinh khí cầu cùng bay trên bầu trời cùng lúc!",
          "audio": `${audioBase}/HotAirBalloon3.wav`
        },
        {
          "sentence": "How does a hot air balloon fly?",
          "translation": "Khinh khí cầu bay như thế nào?",
          "audio": `${audioBase}/HotAirBalloon4.wav`
        },
        {
          "sentence": "When the balloon is on the ground, people light gas to make a small fire.",
          "translation": "Khi khinh khí cầu ở trên mặt đất, mọi người đốt khí gas để tạo lửa nhỏ.",
          "audio": `${audioBase}/HotAirBalloon5.wav`
        },
        {
          "sentence": "The fire heats the air in the balloon.",
          "translation": "Ngọn lửa làm nóng không khí bên trong khinh khí cầu.",
          "audio": `${audioBase}/HotAirBalloon6.wav`
        },
        {
          "sentence": "Because hot air always rises, the balloon begins to go up into the air.",
          "translation": "Bởi vì không khí nóng luôn bay lên, khinh khí cầu bắt đầu bay lên không trung.",
          "audio": `${audioBase}/HotAirBalloon7.wav`
        },
        {
          "sentence": "The pilot of the balloon stands in the basket and lights the gas to go higher.",
          "translation": "Phi công đứng trong giỏ khinh khí cầu và đốt khí để bay cao hơn.",
          "audio": `${audioBase}/HotAirBalloon8.wav`
        },
        {
          "sentence": "The wind then blows the balloon along.",
          "translation": "Gió thổi khinh khí cầu đi theo hướng của nó.",
          "audio": `${audioBase}/HotAirBalloon9.wav`
        },
        {
          "sentence": `Usually, there's a group of people on the ground called the "chase team".`,
          "translation": "Thông thường có một nhóm người trên mặt đất gọi là 'nhóm đuổi theo'.",
          "audio": `${audioBase}/HotAirBalloon10.wav`
        },
        {
          "sentence": "They follow the balloon in a truck.",
          "translation": "Họ đuổi theo khinh khí cầu bằng xe tải.",
          "audio": `${audioBase}/HotAirBalloon11.wav`
        },
        {
          "sentence": "The chase team uses a radio to talk to the pilot.",
          "translation": "Nhóm đuổi theo sử dụng radio để nói chuyện với phi công.",
          "audio": `${audioBase}/HotAirBalloon12.wav`
        },
        {
          "sentence": "The pilot looks for a safe place to land the balloon and tells the chase team where to go.",
          "translation": "Phi công tìm nơi an toàn để hạ khinh khí cầu và báo cho nhóm đuổi theo đi đâu.",
          "audio": `${audioBase}/HotAirBalloon13.wav`
        },
        {
          "sentence": "Then the chase team takes the balloon and the pilot back home!",
          "translation": "Sau đó nhóm đuổi theo đưa khinh khí cầu và phi công trở về nhà!",
          "audio": `${audioBase}/HotAirBalloon14.wav`
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
          "sentence": "There is an International Balloon Fiesta every year.",
          "translation": "Có một lễ hội khinh khí cầu quốc tế mỗi năm.",
          "answer": "T",
          "audio": `${audioBase}/International_Balloon.wav`
        },
        {
          "sentence": "Hot air usually goes down.",
          "translation": "Không khí nóng thường đi xuống.",
          "answer": "F",
          "audio": `${audioBase}/Hot_air_usually_goes_down.wav`
        },
        {
          "sentence": "Balloons are always round.",
          "translation": "Khinh khí cầu luôn luôn tròn.",
          "answer": "F",
          "audio": `${audioBase}/Balloons_are_always_round.wav`
        },
        {
          "sentence": "The pilot stands in the basket.",
          "translation": "Phi công đứng trong giỏ khinh khí cầu.",
          "answer": "T",
          "audio": `${audioBase}/The_pilot_stands_in_the_basket.wav`
        },
        {
          "sentence": "The chase team uses a radio to talk to the pilot.",
          "translation": "Nhóm đuổi theo sử dụng radio để nói chuyện với phi công.",
          "answer": "T",
          "audio": `${audioBase}/The_chase_team_uses_a_radio_to_talk_to_the_pilot.wav`
        }
      ]
    },
    {
      "slug": "number_the_sentences",
      "section": "Read. Write the sentences in order",
      "type": "Ordering",
      "instruction": "Read the sentences. Write the sentences in order.",
      "sentences": [
        {
          "sentence": "The balloon goes up into the air.",
          "translation": "Khinh khí cầu bay lên không trung.",
          "order": 1,
          "audio": `${audioBase}/The_balloon_goes_up_into_the_air.wav`
        },
        {
          "sentence": "The wind blows the balloon along.",
          "translation": "Gió thổi khinh khí cầu đi theo hướng của nó.",
          "order": 2,
          "audio": `${audioBase}/The_wind_blows_the_balloon_along.wav`
        },
        {
          "sentence": "The pilot lands the balloon safely.",
          "translation": "Phi công hạ khinh khí cầu an toàn.",
          "order": 3,
          "audio": `${audioBase}/The_pilot_lands_the_balloon_safely.wav`
        },
        {
          "sentence": "The pilot talks to the chase team.",
          "translation": "Phi công nói chuyện với nhóm đuổi theo.",
          "order": 4,
          "audio": `${audioBase}/The_pilot_talks_to_the_chase_team.wav`
        },
        {
          "sentence": "People light a fire to heat the air in the balloon.",
          "translation": "Mọi người đốt lửa để làm nóng không khí trong khinh khí cầu.",
          "order": 5,
          "audio": `${audioBase}/People_light_a_fire_to_heat_the_air_in_the_balloon.wav`
        }
      ]
    },
    {
      "slug": "talk_about_the_reading",
      "section": "Talk. Look at the photographs from the balloon fiesta. Describe a hot air balloon",
      "type": "Speaking",
      "instruction": "Work with a partner. Describe a hot air balloon",
      "examples": [
        {
          "sentence": "What does a hot air balloon look like?",
          "translation": "Khinh khí cầu trông như thế nào?",
          "audio": `${audioBase}/HotAirBalloonExample1.wav`
        },
        {
          "sentence": "Hot air balloons are big and colorful.",
          "translation": "Khinh khí cầu lớn và nhiều màu sắc.",
          "audio": `${audioBase}/HotAirBalloonExample2.wav`
        }
      ]
    },
    {
        "slug": "weird_but_true",
       "section": "Weird But True",
        "type": "WeirdButTrue",
        "instruction": "Learn an interesting fact about hot air balloons!",
        "content": [
            {
            "sentence": "The first passengers in a hot air balloon were a chicken, a duck, and a sheep!",
            "translation": "Những hành khách đầu tiên trên khinh khí cầu là một con gà, một con vịt và một con cừu!",
            "audio": `${audioBase}/hot_air_balloon_first_passengers.wav`
            }
        ]
    }
  ]
};
export const unit3WritingDataTS: Unit3WritingData = {
  "slug": "unit3_writing",
  "title": "Unit 3 – Writing",
  "sections": [
    {
      "slug": "read_about_my_special_place",
      "section": "Read",
      "type": "Reading",
      "title": "Read. We can use the word \"but\" to show that two connected ideas are different. Underline the sentences with the word \"but\" as you read.",
      "title_vi": "Đọc. Chúng ta có thể dùng từ \"but\" để thể hiện hai ý đối lập. Gạch chân các câu có từ \"but\" khi bạn đọc.",
      "instruction": "Read about the bus system in Curitiba and underline sentences containing \"but\".",
      "instruction_vi": "Đọc về hệ thống xe buýt ở Curitiba và gạch chân các câu có chứa từ \"but\".",
      "content": [
        {
          "sentence": "Catch the Bus in Curitiba!",
          "translation": "Bắt xe buýt ở Curitiba!",
          "audio": `${audioBase}/Catch_the_Busfix.wav`,
          "images": [`${imageBase}/catch_the_bus_in_curitiba.jpg`, `${imageBase}/bus_stops.jpg`]
        },
        {
          "sentence": "My city of Curitiba, Brazil, is famous for its bus system.",
          "translation": "Thành phố Curitiba của tôi ở Brazil nổi tiếng với hệ thống xe buýt.",
          "audio": `${audioBase}/Curitiba_Bus_Systemfix.wav`
        },
        {
          "sentence": "It is called the BRT.",
          "translation": "Nó được gọi là BRT.",
          "audio": `${audioBase}/BRT_Systemfix.wav`
        },
        {
          "sentence": "There are more than a thousand buses in our city.",
          "translation": "Có hơn một nghìn xe buýt trong thành phố của chúng tôi.",
          "audio": `${audioBase}/Thousand_Busesfix.wav`
        },
        {
          "sentence": "There are many cars and trucks on the roads, but the buses use a special lane.",
          "translation": "Có nhiều ô tô và xe tải trên đường, nhưng xe buýt sử dụng một làn đường đặc biệt.",
          "audio": `${audioBase}/Special_Lanefix.wav`
        },
        {
          "sentence": "They can move fast.",
          "translation": "Chúng có thể di chuyển nhanh.",
          "audio": `${audioBase}/Move_Fastfix.wav`
        },
        {
          "sentence": "In some parts of the city, you can catch a bus every 90 seconds.",
          "translation": "Ở một số khu vực trong thành phố, bạn có thể bắt xe buýt mỗi 90 giây.",
          "audio": `${audioBase}/Every_90_Secondsfix.wav`
        },
        {
          "sentence": "Many buses are the typical size, but some of the buses are very long.",
          "translation": "Nhiều xe buýt có kích thước thông thường, nhưng một số xe buýt rất dài.",
          "audio": `${audioBase}/Long_Busesfix.wav`
        },
        {
          "sentence": "They carry a lot of people.",
          "translation": "Chúng chở được nhiều người.",
          "audio": `${audioBase}/Carry_Peoplefix.wav`
        },
        {
          "sentence": "The buses are modern, and some of the bus stops are, too.",
          "translation": "Xe buýt rất hiện đại, và một số trạm xe buýt cũng vậy.",
          "audio": `${audioBase}/Modern_Busesfix.wav`
        },
        {
          "sentence": "At these stops, people can get on and off the bus in 15 seconds.",
          "translation": "Tại các trạm này, mọi người có thể lên và xuống xe buýt trong 15 giây.",
          "audio": `${audioBase}/Quick_Stopsfix.wav`
        }
      ]
    },
    {
      "slug": "write_about_your_favorite_transportation",
      "section": "Write",
      "type": "Writing",
      "title": "Describe your favorite transportation where you live.",
      "title_vi": "Miêu tả phương tiện giao thông yêu thích của bạn tại nơi bạn sống.",
      "instruction": "Write a paragraph about your favorite transportation where you live.",
      "instruction_vi": "Viết một đoạn văn về phương tiện giao thông yêu thích của bạn tại nơi bạn sống.",
      "input": {
        "placeholder": "Write your paragraph here...",
        "placeholder_vi": "Viết đoạn văn của bạn vào đây..."
      }
    },
    {
      "slug": "share_your_writing",
      "section": "Share",
      "type": "Speaking",
      "title": "Share your writing in a small group. Listen and take notes.",
      "title_vi": "Chia sẻ bài viết của bạn trong một nhóm nhỏ. Lắng nghe và ghi chú.",
      "instruction": "Write down the names and favorite transportation of your classmates.",
      "instruction_vi": "Ghi lại tên và phương tiện giao thông yêu thích của các bạn cùng lớp.",
      "table": {
        "columns": ["Name", "Transportation"],
        "columns_vi": ["Tên", "Phương tiện giao thông"],
        "rows": [["", ""], ["", ""]]
      }
    }
  ]
};
export const unit3TheLionAndTheMouseDataTS :UnitData = {
  "slug": "unit3_the_lion_and_the_mouse",
  "title": "Unit 3 – The Lion and the Mouse",
  "reading": [
    {
      "id": "1",
      "text": "THE LION and the Mouse",
      "translation": "Sư tử và chuột",
      "audioSrc": `${audioBase}/Lion_and_mouse.wav`
    },
    {
      "id": "2",
      "text": "Lion is sleeping in the grass.",
      "translation": "Sư tử đang ngủ trong bãi cỏ.",
      "audioSrc": `${audioBase}/Lion_is_sleeping.wav`
    },
    {
      "id": "3",
      "text": "Little Mouse doesn't see Lion.",
      "translation": "Con chuột nhỏ không nhìn thấy sư tử.",
      "audioSrc": `${audioBase}/Little_mouse.wav`
    },
    {
      "id": "4",
      "text": "She runs right over Lion's big paw.",
      "translation": "“Nó chạy ngay qua bàn chân to của sư tử.",
      "audioSrc": `${audioBase}/She_run.wav`
    },
    {
      "id": "5",
      "text": "\"Aha! I've GOT you!\" says Lion.",
      "translation": "\“A ha! Ta bắt được ngươi rồi!\” – Sư tử nói.",
      "audioSrc": `${audioBase}/says_Lion.wav`
    },
    {
      "id": "6",
      "text": "Lucky me! I always eat a snack before I sleep.",
      "translation": "May mắn cho ta! Ta luôn ăn nhẹ trước khi ngủ.",
      "audioSrc": `${audioBase}/lucky_me.wav`
    },
    {
      "id": "7",
      "text": "Mmmm. What a nice snack!\" he picks Mouse up",
      "translation": "\“Mmm. Món ăn nhẹ ngon quá!\” – Sư tử nhấc con chuột lên.",
      "audioSrc": `${audioBase}/picks_mouse_up.wav`
    },
    {
      "id": "8-b",
      "text": "Oh, please! Don't eat me! says Mouse. ",
      "translation": "\“Ôi, làm ơn! Đừng ăn tôi!\” – Chuột van xin.",
      "audioSrc": `${audioBase}/dont_eat_me.wav`
    },
    {
      "id": "8-a",
      "text": "\"One day, I can help you!\"",
      "translation": "Một ngày nào đó, tôi có thể giúp ngài!",
      "audioSrc": `${audioBase}/One_day.wav`
    },
    {
      "id": "9",
      "text": "You? Help me? A little mouse! Ha! Ha! say Lion",
      "translation": "\“Ngươi à? Giúp ta ư? Một con chuột bé tí! Ha ha!\” – Sư tử cười.",
      "audioSrc": `${audioBase}/Ha_ha_lion.wav`
    },
    {
      "id": "10",
      "text": "He laughs and laughs.",
      "translation": "Nó cười lớn mãi không thôi.",
      "audioSrc": `${audioBase}/He_laughs.wav`
    },
    {
      "id": "11",
      "text": "\"You're lucky. I'm not very hungry today. You can go!\" he drops Mouse",
      "translation": "\“Ngươi may mắn đấy. Hôm nay ta không đói lắm. Ngươi có thể đi!\” – Rồi sư tử thả chuột ra.",
      "audioSrc": `${audioBase}/You_lucky.wav`
    },
    {
      "id": "12",
      "text": "Mouse runs away",
      "translation": "Chuột chạy đi.",
      "audioSrc": `${audioBase}/Mouse_runs_away.wav`
    },
    {
      "id": "13",
      "text": "Many days later, Mouse is running in the grass again. She hears Lion",
      "translation": "Nhiều ngày sau, chuột lại chạy trong bãi cỏ và nghe thấy tiếng sư tử.",
      "audioSrc": `${audioBase}/Many_days_later.wav`
    },
    {
      "id": "14",
      "text": "Roar! Oh, roar! Help! Please, can anybody help me?\" asks Lion",
      "translation": "\“Gầm! Ôi gầm! Cứu với! Có ai giúp tôi không?\” – Sư tử kêu.",
      "audioSrc": `${audioBase}/asks_Lion.wav`
    },
    {
      "id": "15",
      "text": "He is in a big net.",
      "translation": "Sư tử bị mắc trong một tấm lưới lớn.",
      "audioSrc": `${audioBase}/He_is_in_a_big_net.wav`
    },
    {
      "id": "16",
      "text": "He is worried and angry.",
      "translation": "Nó lo lắng và tức giận.",
      "audioSrc": `${audioBase}/He_is_worried.wav`
    },
    {
      "id": "17",
      "text": "\"I can't get out,\" Lion says",
      "translation": "\“Ta không thể thoát ra được,\” sư tử nói.",
      "audioSrc": `${audioBase}/I_cant_get_out.wav`
    },
    {
      "id": "18",
      "text": "\"I can help you,\" says Mouse. \"I can use my teeth! I can chew the net!\"",
      "translation": "\“Tôi có thể giúp ngài,\” chuột nói. \“Tôi có thể dùng răng để gặm lưới!\”",
      "audioSrc": `${audioBase}/I_can_use_my_teeth.wav`
    },
    {
      "id": "19",
      "text": "\"Mouse chews and chews. Soon Lion is free.\"",
      "translation": "Chuột gặm mãi, gặm mãi. Chẳng bao lâu, sư tử được tự do.",
      "audioSrc": `${audioBase}/mouse_chews_and_chews.wav`
    },
    {
      "id": "20",
      "text": "\"Thank you, Mouse!\" says Lion",
      "translation": "\“Cảm ơn ngươi, Chuột nhỏ!\” – Sư tử nói.",
      "audioSrc": `${audioBase}/thank_you.wav`
    },
    {
      "id": "21",
      "text": "\"You're welcome,\" says Mouse. \"Even a little mouse can help a big lion!\"",
      "translation": "\“Không có gì đâu,\” chuột nói. \“Ngay cả một con chuột nhỏ cũng có thể giúp một con sư tử to lớn!\”",
      "audioSrc": `${audioBase}/you_welcome.wav`
    }
  ],
  "readingImage": `${imageBase}/laughs.jpg`,
  "vocabulary": [
    {
      "id": "v1",
      "word": "chew",
      "translation": "nhai",
      "audioSrc": `${audioBase}/Vocab_Chew.wav`,
      "imageSrc": `${imageBase}/chew.jpg`
    },
    {
      "id": "v2",
      "word": "paw",
      "translation": "bàn chân",
      "audioSrc": `${audioBase}/Vocab_Paw.wav`,
      "imageSrc": `${imageBase}/paw.jpg`
    },
    {
      "id": "v3",
      "word": "net",
      "translation": "lưới",
      "audioSrc": `${audioBase}/Vocab_Net.wav`,
      "imageSrc": `${imageBase}/net.jpg`
    }
  ],
  "exercises": {
    "order_story": {
      "instructions": "Put the story events in the correct order.",
      "instructions_vi": "Sắp xếp các sự kiện của câu chuyện theo thứ tự đúng.",
      "instructionsAudio": `${audioBase}/Order_Story_Instructions.wav`,
      "sentences": [
        {
          "text": "Mouse sees Lion in a net.",
          "translation": "Con chuột thấy sư tử trong lưới.",
          "audioSrc": `${audioBase}/Order_Mouse_Sees.wav`,
          "order": 1
        },
        {
          "text": "Mouse chews the net",
          "translation": "Con chuột gặm lưới.",
          "audioSrc": `${audioBase}/Order_Mouse_Chews.wav`,
          "order": 2
        },
        {
          "text": "Lion laughs and drops Mouse",
          "translation": "Sư tử cười và thả con chuột.",
          "audioSrc": `${audioBase}/Order_Lion_Laughs.wav`,
          "order": 3
        },
        {
          "text": "Lion thanks Mouse",
          "translation": "Sư tử cảm ơn con chuột.",
          "audioSrc": `${audioBase}/Order_Lion_Thanks.wav`,
          "order": 4
        },
        {
          "text": "Lion catches Mouse",
          "translation": "Sư tử bắt con chuột.",
          "audioSrc": `${audioBase}/Order_Lion_Catches.wav`,
          "order": 5
        }
      ]
    },
    "describe_animals": {
      "instructions": "Use the words to describe the lion and the mouse.",
      "instructions_vi": "Sử dụng các từ để miêu tả sư tử và chuột.",
      "word_box": ["big", "clever", "funny", "scared", "small", "strong"],
      "word_box_vi": ["lớn", "nhỏ", "thông minh", "sợ hãi", "nhỏ", "mạnh mẽ"],
      "tables": [
        {
          "subject": "The Lion",
          "imageSrc": `${imageBase}/lion.jpg`,
          "example_sentences": [
            {"text": "The lion is big.", "translation": "Sư tử rất lớn."},
            {"text": "The lion is strong.", "translation": "Sư tử rất mạnh mẽ."},
            {"text": "The lion is clever.", "translation": "Sư tử rất thông minh."}
          ]
        },
        {
          "subject": "The Mouse",
          "imageSrc": `${imageBase}/mouse.jpg`,
          "example_sentences": [
            {"text": "The mouse is small.", "translation": "Con chuột rất nhỏ."},
            {"text": "The mouse is scared.", "translation": "Con chuột rất sợ hãi."},
            {"text": "The mouse is funny.", "translation": "Con chuột rất vui tính."}
          ]
        }
      ]
    },
    "express_yourself": {
      "instructions": "Choose an activity to express what you learned from the story.",
      "instructions_vi": "Chọn một hoạt động để thể hiện điều bạn học được từ câu chuyện.",
      "activities": [
        {
          "option": "A",
          "text": "Draw a picture. Turn the fable into a comic book story.",
          "translation": "Vẽ một bức tranh và biến truyện ngụ ngôn thành truyện tranh.",
          "audioSrc": `${audioBase}/Express_Draw_Picture.wav`
        },
        {
          "option": "B",
          "text": "Make bag puppets. Perform the fable for your class.",
          "translation": "Làm rối túi và biểu diễn truyện ngụ ngôn cho lớp.",
          "audioSrc": `${audioBase}/Express_Write_Sentence.wav`
        },
        {
          "option": "C",
          "text": "Think of another fable. Tell or read it to the class.",
          "translation": "Nghĩ ra một truyện ngụ ngôn khác và kể hoặc đọc cho lớp.",
          "audioSrc": `${audioBase}/Express_Write_Sentence_1.wav`
        }
      ]
    }
  }
};
