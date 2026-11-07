import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 12: Thời tiết & môi trường. */
export const TOPIC_12: SeedVocabTopic = {
  name: "Thời tiết & môi trường",
  slug: "thoi-tiet-moi-truong",
  icon: "partly_cloudy_day",
  description:
    "Từ vựng về thời tiết, khí hậu, thiên tai và những việc làm bảo vệ môi trường.",
  lessons: [
    {
      title: "Thời tiết hằng ngày",
      summary:
        "20 từ/cụm từ về dự báo, nhiệt độ, nắng mưa, gió và các hiện tượng thời tiết thường gặp.",
      sections: [
        {
          title: "Dự báo và nhiệt độ",
          body: `- **forecast**: dự báo thời tiết
- **temperature**: nhiệt độ
- **degree**: độ
- **humid / humidity**: ẩm / độ ẩm
- **mild / chilly**: ôn hòa / se lạnh

Mẫu câu:
- The **forecast** says it will rain tomorrow.
- It's twenty **degrees** today.`,
          remember: "temperature cao/thấp dùng high/low, không dùng big/small.",
        },
        {
          title: "Nắng, mưa và gió",
          body: `- **bright / overcast**: sáng sủa / u ám
- **wet**: ẩm ướt, có mưa
- **gusty**: gió từng cơn mạnh
- **foggy**: có sương mù
- **drizzle / downpour**: mưa phùn / mưa xối xả
- **thunder / lightning**: sấm / chớp

Mẫu câu:
- We got caught in a sudden **downpour**.
- The sky was **overcast** all day.`,
          remember: "drizzle nhẹ hơn shower; downpour là mưa rất to.",
        },
      ],
      words: [
        w("forecast", "/ˈfɔːkɑːst/", "n/v", "dự báo thời tiết; dự báo", "a statement about future weather", "The forecast looks good for the weekend."),
        w("temperature", "/ˈtemprətʃə(r)/", "n", "nhiệt độ", "how hot or cold something is", "The temperature dropped below zero."),
        w("celsius", "/ˈselsiəs/", "n/adj", "độ C", "a scale for measuring temperature", "It was thirty degrees celsius in the shade."),
        w("bright", "/braɪt/", "adj", "sáng sủa", "full of light and sunshine", "It was a bright, clear morning."),
        w("overcast", "/ˌəʊvəˈkɑːst/", "adj", "u ám, nhiều mây", "covered with grey clouds", "The sky was overcast before the storm."),
        w("wet", "/wet/", "adj", "ẩm ướt, có mưa", "covered in water or raining", "Take an umbrella — it's wet outside."),
        w("gusty", "/ˈɡʌsti/", "adj", "gió từng cơn mạnh", "with strong sudden winds", "It was too gusty to go sailing."),
        w("foggy", "/ˈfɒɡi/", "adj", "có sương mù", "with thick cloud near the ground", "The road was dangerous in foggy weather."),
        w("stormy", "/ˈstɔːmi/", "adj", "có bão", "with strong wind and rain", "We stayed indoors on stormy days."),
        w("humid", "/ˈhjuːmɪd/", "adj", "ẩm ướt (không khí)", "having a lot of water in the air", "Summer here is hot and humid."),
        w("humidity", "/hjuːˈmɪdəti/", "n", "độ ẩm", "the amount of water in the air", "The humidity makes it feel hotter."),
        w("drizzle", "/ˈdrɪzl/", "n/v", "mưa phùn; mưa lất phất", "light rain", "A fine drizzle continued all morning."),
        w("downpour", "/ˈdaʊnpɔː(r)/", "n", "mưa xối xả", "a heavy sudden rain", "We sheltered from the downpour under a tree."),
        w("thunder", "/ˈθʌndə(r)/", "n", "sấm", "the loud noise during a storm", "The thunder woke the children."),
        w("lightning", "/ˈlaɪtnɪŋ/", "n", "chớp", "a sudden flash of light in a storm", "Lightning struck a tree nearby."),
        w("breeze", "/briːz/", "n", "làn gió nhẹ", "a gentle wind", "A cool breeze came from the sea."),
        w("frost", "/frɒst/", "n", "sương giá", "a thin layer of ice on surfaces", "There was frost on the car this morning."),
        w("heatwave", "/ˈhiːtweɪv/", "n", "đợt nắng nóng", "a long period of very hot weather", "The heatwave lasted two weeks."),
        w("chilly", "/ˈtʃɪli/", "adj", "se lạnh", "unpleasantly cold", "It gets chilly in the evening."),
        w("mild", "/maɪld/", "adj", "ôn hòa", "not very cold or severe", "We had a mild winter this year."),
      ],
    },
    {
      title: "Khí hậu & mùa",
      summary:
        "20 từ/cụm từ về đới khí hậu, mùa mưa, mùa khô, lượng mưa và ánh sáng ban ngày.",
      sections: [
        {
          title: "Các đới khí hậu",
          body: `- **climate**: khí hậu
- **tropical / polar**: nhiệt đới / hàn đới
- **climate zone**: đới khí hậu
- **equator / hemisphere**: đường xích đạo / bán cầu
- **altitude / latitude**: độ cao / vĩ độ

Mẫu câu:
- The country has a **tropical** climate.
- The **equator** passes through Indonesia.`,
          remember: "weather là thời tiết ngắn hạn; climate là khí hậu dài hạn.",
        },
        {
          title: "Mùa mưa và ánh sáng",
          body: `- **dry season / wet season**: mùa khô / mùa mưa
- **monsoon**: gió mùa
- **rainfall**: lượng mưa
- **sunshine / daylight**: ánh nắng / ánh sáng ban ngày
- **sunrise / sunset**: bình minh / hoàng hôn
- **seasonal**: theo mùa

Mẫu câu:
- The **rainy season** starts in May.
- **Daylight** lasts longer in summer.`,
          remember: "rainfall không đếm được; dùng heavy rainfall, không dùng many rainfalls.",
        },
      ],
      words: [
        w("climate", "/ˈklaɪmət/", "n", "khí hậu", "the usual weather of a region", "The island has a warm climate."),
        w("tropical", "/ˈtrɒpɪkl/", "adj", "nhiệt đới", "from or relating to the hot regions near the equator", "Tropical storms are common here."),
        w("polar", "/ˈpəʊlə(r)/", "adj", "hàn đới, ở hai cực", "relating to the coldest areas of the earth", "Polar ice is melting quickly."),
        w("dry season", "/ˈdraɪ siːzn/", "n", "mùa khô", "the period of the year with little rain", "Water is scarce during the dry season."),
        w("wet season", "/ˈwet siːzn/", "n", "mùa mưa", "the period of the year with heavy rain", "Roads flood in the wet season."),
        w("monsoon", "/mɒnˈsuːn/", "n", "gió mùa", "a seasonal wind bringing heavy rain", "The monsoon arrived early this year."),
        w("equator", "/ɪˈkweɪtə(r)/", "n", "đường xích đạo", "the imaginary line around the middle of the earth", "Countries near the equator are hot all year."),
        w("hemisphere", "/ˈhemɪsfɪə(r)/", "n", "bán cầu", "half of the earth", "Australia is in the southern hemisphere."),
        w("weather pattern", "/ˈweðə pætn/", "n", "kiểu thời tiết", "a repeated way weather changes", "Climate change is altering weather patterns."),
        w("average", "/ˈævərɪdʒ/", "n/adj", "mức trung bình; trung bình", "the usual or middle amount", "The average rainfall is high here."),
        w("rainfall", "/ˈreɪnfɔːl/", "n", "lượng mưa", "the amount of rain that falls", "Rainfall has decreased this year."),
        w("sunshine", "/ˈsʌnʃaɪn/", "n", "ánh nắng", "light from the sun", "We get plenty of sunshine in July."),
        w("daylight", "/ˈdeɪlaɪt/", "n", "ánh sáng ban ngày", "natural light during the day", "We finished the walk before daylight faded."),
        w("sunrise", "/ˈsʌnraɪz/", "n", "bình minh", "the time when the sun comes up", "We watched the sunrise from the beach."),
        w("sunset", "/ˈsʌnset/", "n", "hoàng hôn", "the time when the sun goes down", "The sunset was beautiful."),
        w("climate zone", "/ˈklaɪmət zəʊn/", "n", "đới khí hậu", "an area with a particular climate", "Vietnam has several climate zones."),
        w("altitude", "/ˈæltɪtjuːd/", "n", "độ cao", "height above sea level", "At this altitude, the air is thin."),
        w("latitude", "/ˈlætɪtjuːd/", "n", "vĩ độ", "distance north or south of the equator", "The latitude affects the length of the day."),
        w("thermometer", "/θəˈmɒmɪtə(r)/", "n", "nhiệt kế", "an instrument for measuring temperature", "The thermometer showed thirty degrees."),
        w("seasonal", "/ˈsiːzənl/", "adj", "theo mùa", "happening at a particular time of year", "Seasonal work is common in tourism."),
      ],
    },
    {
      title: "Thiên tai",
      summary:
        "20 từ/cụm từ về động đất, bão, lũ lụt, cháy rừng và công tác cứu hộ.",
      sections: [
        {
          title: "Các loại thiên tai",
          body: `- **disaster**: thảm họa
- **earthquake / tsunami**: động đất / sóng thần
- **drought / landslide**: hạn hán / sạt lở đất
- **hurricane / typhoon / tornado**: bão lớn / bão nhiệt đới / lốc xoáy
- **wildfire / blizzard**: cháy rừng / bão tuyết

Mẫu câu:
- The **earthquake** destroyed many buildings.
- A **drought** lasted for several months.`,
          remember: "hurricane (Đại Tây Dương), typhoon (Tây Thái Bình Dương) đều là bão lớn.",
        },
        {
          title: "Cứu hộ và thiệt hại",
          body: `- **volcano / eruption**: núi lửa / vụ phun trào
- **avalanche**: lở tuyết
- **storm / hail**: bão / mưa đá
- **victim**: nạn nhân
- **evacuate / shelter**: sơ tán / nơi trú ẩn
- **rescue / destroy**: cứu hộ / phá hủy

Mẫu câu:
- Thousands of people were **evacuated**.
- The **victims** received food and shelter.`,
          remember: "evacuate là sơ tán người; rescue là cứu người khỏi nguy hiểm.",
        },
      ],
      words: [
        w("disaster", "/dɪˈzɑːstə(r)/", "n", "thảm họa", "a very bad event causing great damage", "The flood was the worst disaster in years."),
        w("earthquake", "/ˈɜːθkweɪk/", "n", "động đất", "a sudden shaking of the ground", "The earthquake measured six on the Richter scale."),
        w("drought", "/draʊt/", "n", "hạn hán", "a long period without rain", "The drought ruined the crops."),
        w("hurricane", "/ˈhʌrɪkən/", "n", "bão lớn", "a violent storm with strong winds", "The hurricane hit the coast at night."),
        w("typhoon", "/taɪˈfuːn/", "n", "bão nhiệt đới", "a violent tropical storm in the western Pacific", "The typhoon forced schools to close."),
        w("tornado", "/tɔːˈneɪdəʊ/", "n", "lốc xoáy", "a very strong spinning wind", "A tornado damaged several houses."),
        w("volcano", "/vɒlˈkeɪnəʊ/", "n", "núi lửa", "a mountain that can erupt", "The volcano has been quiet for decades."),
        w("eruption", "/ɪˈrʌpʃn/", "n", "vụ phun trào", "the sudden explosion of a volcano", "The eruption sent ash into the sky."),
        w("tsunami", "/tsuːˈnɑːmi/", "n", "sóng thần", "a huge wave caused by an earthquake", "The tsunami warning was issued immediately."),
        w("landslide", "/ˈlændslaɪd/", "n", "sạt lở đất", "a mass of earth falling down a hill", "Heavy rain caused a landslide."),
        w("avalanche", "/ˈævəlɑːnʃ/", "n", "lở tuyết", "a large amount of snow falling down a mountain", "Two climbers were caught in an avalanche."),
        w("wildfire", "/ˈwaɪldfaɪə(r)/", "n", "cháy rừng", "a fire that spreads quickly through countryside", "The wildfire burned for a week."),
        w("storm", "/stɔːm/", "n", "cơn bão", "very bad weather with strong wind and rain", "A storm is expected tonight."),
        w("blizzard", "/ˈblɪzəd/", "n", "bão tuyết", "a severe snowstorm with strong wind", "The blizzard closed the mountain road."),
        w("hail", "/heɪl/", "n", "mưa đá", "small balls of ice falling like rain", "The hail damaged the car."),
        w("victim", "/ˈvɪktɪm/", "n", "nạn nhân", "a person harmed by an event", "The victims were given temporary housing."),
        w("evacuate", "/ɪˈvækjueɪt/", "v", "sơ tán", "to move people away from danger", "Residents were evacuated before the storm."),
        w("shelter", "/ˈʃeltə(r)/", "n/v", "nơi trú ẩn; trú ẩn", "a safe place; to protect from danger", "We took shelter in a school."),
        w("rescue", "/ˈreskjuː/", "v/n", "cứu hộ; cuộc cứu hộ", "to save someone from danger", "The team rescued three climbers."),
        w("destroy", "/dɪˈstrɔɪ/", "v", "phá hủy", "to damage something completely", "The fire destroyed the whole village."),
      ],
    },
    {
      title: "Bảo vệ môi trường",
      summary:
        "20 từ/cụm từ về ô nhiễm, rác thải, năng lượng tái tạo và hành động sống xanh.",
      sections: [
        {
          title: "Ô nhiễm và rác thải",
          body: `- **environment**: môi trường
- **pollution / pollute**: sự ô nhiễm / làm ô nhiễm
- **plastic waste / litter**: rác thải nhựa / rác vứt bừa bãi
- **carbon footprint**: dấu chân carbon
- **greenhouse gas / emission**: khí nhà kính / khí thải

Mẫu câu:
- Air **pollution** is a serious problem in big cities.
- We should reduce our **carbon footprint**.`,
          remember: "pollution là danh từ; pollute là động từ; polluted là tính từ.",
        },
        {
          title: "Năng lượng và bảo tồn",
          body: `- **renewable energy**: năng lượng tái tạo
- **solar / wind power**: năng lượng mặt trời / gió
- **fossil fuel**: nhiên liệu hóa thạch
- **deforestation**: nạn phá rừng
- **endangered / conservation**: có nguy cơ tuyệt chủng / sự bảo tồn
- **sustainable / eco-friendly**: bền vững / thân thiện môi trường
- **climate change / sea level**: biến đổi khí hậu / mực nước biển

Mẫu câu:
- **Solar power** is clean and renewable.
- The government is investing in **conservation**.`,
          remember: "renewable energy không cạn kiệt; fossil fuel thì có hạn.",
        },
      ],
      words: [
        w("environment", "/ɪnˈvaɪrənmənt/", "n", "môi trường", "the natural world around us", "We must protect the environment."),
        w("pollution", "/pəˈluːʃn/", "n", "sự ô nhiễm", "damage to air, water or land", "The city suffers from heavy air pollution."),
        w("pollute", "/pəˈluːt/", "v", "làm ô nhiễm", "to make air, water or land dirty", "Factories pollute the river."),
        w("plastic waste", "/ˈplæstɪk weɪst/", "n", "rác thải nhựa", "discarded plastic materials", "Plastic waste harms sea animals."),
        w("litter", "/ˈlɪtə(r)/", "n", "rác vứt bừa bãi", "small pieces of rubbish left in public places", "There was litter all over the beach."),
        w("carbon footprint", "/ˈkɑːbən fʊtprɪnt/", "n", "dấu chân carbon", "the amount of carbon dioxide produced by an activity", "Flying increases your carbon footprint."),
        w("greenhouse gas", "/ˈɡriːnhaʊs ɡæs/", "n", "khí nhà kính", "a gas that traps heat in the atmosphere", "Cars produce greenhouse gases."),
        w("emission", "/ɪˈmɪʃn/", "n", "khí thải", "gas or other substance released into the air", "The new law limits emissions."),
        w("renewable energy", "/rɪˈnjuːəbl enədʒi/", "n", "năng lượng tái tạo", "energy from sources that do not run out", "The country is investing in renewable energy."),
        w("solar power", "/ˈsəʊlə paʊə(r)/", "n", "năng lượng mặt trời", "energy produced from sunlight", "Solar power heats the water."),
        w("wind power", "/ˈwɪnd paʊə(r)/", "n", "năng lượng gió", "energy produced from the wind", "Wind power is common in coastal areas."),
        w("fossil fuel", "/ˈfɒsl fjuːəl/", "n", "nhiên liệu hóa thạch", "coal, oil or gas formed underground", "Burning fossil fuels causes climate change."),
        w("deforestation", "/ˌdiːfɒrɪˈsteɪʃn/", "n", "nạn phá rừng", "the cutting down of large areas of forest", "Deforestation threatens wildlife."),
        w("endangered", "/ɪnˈdeɪndʒəd/", "adj", "có nguy cơ tuyệt chủng", "at risk of disappearing", "The tiger is an endangered species."),
        w("conservation", "/ˌkɒnsəˈveɪʃn/", "n", "sự bảo tồn", "the protection of nature", "The park is a conservation area."),
        w("sustainable", "/səˈsteɪnəbl/", "adj", "bền vững", "able to continue without harming the environment", "We need more sustainable farming."),
        w("eco-friendly", "/ˌiːkəʊ ˈfrendli/", "adj", "thân thiện môi trường", "not harmful to the environment", "This packaging is eco-friendly."),
        w("climate change", "/ˈklaɪmət tʃeɪndʒ/", "n", "biến đổi khí hậu", "long-term changes in the earth's climate", "Climate change is affecting every country."),
        w("sea level", "/ˈsiː levl/", "n", "mực nước biển", "the average height of the sea", "Rising sea levels threaten coastal cities."),
        w("biodegradable", "/ˌbaɪəʊdɪˈɡreɪdəbl/", "adj", "phân hủy sinh học", "able to decay naturally safely", "Use biodegradable bags when you shop."),
      ],
    },
  ],
};
