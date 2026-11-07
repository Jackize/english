import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 25: Môi trường & phát triển bền vững. */
export const TOPIC_25: SeedVocabTopic = {
  name: "Môi trường & phát triển bền vững",
  slug: "moi-truong-ben-vung",
  icon: "eco",
  description:
    "Từ vựng về ô nhiễm, biến đổi khí hậu, năng lượng tái tạo, tiêu dùng bền vững và các chính sách bảo vệ môi trường.",
  lessons: [
    {
      title: "Ô nhiễm & rác thải",
      summary:
        "20 từ/cụm từ về các loại ô nhiễm, rác thải, hóa chất độc hại và cách xử lý chất thải.",
      sections: [
        {
          title: "Ô nhiễm",
          body: `- **contamination / poison**: sự nhiễm bẩn / đầu độc
- **discharge / exhaust**: sự xả thải / khí xả
- **toxic / chemical**: độc hại / hóa chất
- **sewage / contaminate**: nước thải / làm ô nhiễm
- **smog**: sương khói
- **methane**: khí metan

Mẫu câu:
- Air **contamination** is a serious problem in big cities.
- Factory **discharge** damages the soil and water.`,
          remember:
            "pollution là danh từ; pollute là động từ; polluted là tính từ.",
        },
        {
          title: "Rác thải và xử lý",
          body: `- **debris / fly-tipping**: mảnh vụn, rác thải / việc đổ rác trái phép
- **landfill / dump**: bãi chôn lấp / bãi rác
- **plastic / disposable**: nhựa / dùng một lần
- **upcycle / recycling**: tái chế nâng cấp / việc tái chế
- **bin / carbon-neutral**: thùng rác / trung hòa carbon

Mẫu câu:
- Please put the **debris** in the **bin**.
- Single-use **plastic** ends up in the ocean.`,
          remember:
            "litter là rác nhỏ vứt bừa bãi; waste là chất thải nói chung.",
        },
      ],
      words: [
        w("contamination", "/kənˌtæmɪˈneɪʃn/", "n", "sự nhiễm bẩn", "the state of being polluted", "The city has high levels of air contamination."),
        w("poison", "/ˈpɔɪzn/", "v/n", "đầu độc; chất độc", "to make water or land harmful", "The factory poisoned the river for years."),
        w("debris", "/ˈdebriː/", "n", "mảnh vụn, rác thải", "pieces of waste left after damage", "Debris from the storm covered the beach."),
        w("fly-tipping", "/ˈflaɪ tɪpɪŋ/", "n", "việc đổ rác trái phép", "illegally leaving waste in a public place", "Fly-tipping costs the council thousands of pounds."),
        w("landfill", "/ˈlændfɪl/", "n", "bãi chôn lấp", "a place where waste is buried underground", "Most of that plastic goes to landfill."),
        w("discharge", "/ˈdɪstʃɑːdʒ/", "n/v", "sự xả thải; xả thải", "the release of gas or liquid into the environment", "The new law limits carbon discharge."),
        w("toxic", "/ˈtɒksɪk/", "adj", "độc hại", "containing poison", "The site is full of toxic chemicals."),
        w("chemical", "/ˈkemɪkl/", "n/adj", "hóa chất; hóa học", "a substance used in chemistry or industry", "Farmers use fewer chemicals now."),
        w("sewage", "/ˈsuːɪdʒ/", "n", "nước thải", "waste water and human waste carried away by pipes", "Untreated sewage flowed into the sea."),
        w("plastic", "/ˈplæstɪk/", "n/adj", "nhựa", "a light artificial material", "Plastic takes hundreds of years to break down."),
        w("disposable", "/dɪˈspəʊzəbl/", "adj", "dùng một lần", "made to be thrown away after use", "Many cafés have stopped using disposable cups."),
        w("upcycle", "/ˌʌpˈsaɪkl/", "v", "tái chế nâng cấp", "to turn old items into something more valuable", "She upcycles old furniture and sells it online."),
        w("recycling", "/ˌriːˈsaɪklɪŋ/", "n", "việc tái chế", "the process of treating waste to use again", "Recycling reduces the amount of rubbish."),
        w("bin", "/bɪn/", "n", "thùng rác", "a container for rubbish", "Put the bottles in the recycling bin."),
        w("dump", "/dʌmp/", "n/v", "bãi rác; đổ, vứt", "a place for rubbish or to put waste somewhere", "They dump old furniture by the road."),
        w("contaminate", "/kənˈtæmɪneɪt/", "v", "làm ô nhiễm", "to make something dirty or unsafe", "The chemicals contaminated the groundwater."),
        w("smog", "/smɒɡ/", "n", "sương khói", "air pollution mixed with fog", "Thick smog covered the city centre."),
        w("methane", "/ˈmiːθeɪn/", "n", "khí metan", "a powerful greenhouse gas", "Farm animals produce methane."),
        w("carbon-neutral", "/ˌkɑːbən ˈnjuːtrəl/", "adj", "trung hòa carbon", "producing no net increase in carbon dioxide", "The company aims to become carbon-neutral by 2030."),
        w("exhaust", "/ɪɡˈzɔːst/", "n", "khí xả", "gas produced by an engine", "Car exhaust is a major cause of smog."),
      ],
    },
    {
      title: "Khí hậu & năng lượng",
      summary:
        "20 từ/cụm từ về biến đổi khí hậu, thời tiết cực đoan, nhiên liệu hóa thạch và năng lượng tái tạo.",
      sections: [
        {
          title: "Biến đổi khí hậu",
          body: `- **atmosphere / ozone layer**: khí quyển / tầng ô-dôn
- **global warming / greenhouse effect**: sự nóng lên toàn cầu / hiệu ứng nhà kính
- **water shortage / flash flood / blaze**: thiếu nước / lũ quét / đám cháy lớn
- **glacier / coastline**: sông băng / đường bờ biển
- **logging**: việc khai thác gỗ
- **carbon dioxide**: khí CO₂

Mẫu câu:
- **Global warming** is causing longer **water shortages**.
- Rising seas threaten the whole **coastline**.`,
          remember:
            "weather là thời tiết ngắn hạn; climate là khí hậu dài hạn.",
        },
        {
          title: "Năng lượng",
          body: `- **renewable / low-carbon**: tái tạo / ít carbon
- **solar / wind turbine**: năng lượng mặt trời / tua-bin gió
- **crude oil / coal**: dầu thô / than đá
- **generate / hydropower**: sản xuất (điện) / thủy điện
- **biomass**: sinh khối

Mẫu câu:
- The country is investing in **renewable** energy.
- **Solar** panels now power the whole school.`,
          remember:
            "renewable energy = năng lượng tái tạo, không cạn kiệt như than hay dầu.",
        },
      ],
      words: [
        w("atmosphere", "/ˈætməsfɪə(r)/", "n", "khí quyển", "the layer of air around the earth", "Pollution is damaging the atmosphere."),
        w("ozone layer", "/ˈəʊzəʊn leɪə(r)/", "n", "tầng ô-dôn", "a layer of gas that protects the earth from the sun", "The ozone layer is slowly recovering."),
        w("global warming", "/ˌɡləʊbl ˈwɔːmɪŋ/", "n", "sự nóng lên toàn cầu", "the rise in the earth's average temperature", "Global warming is melting the ice caps."),
        w("greenhouse effect", "/ˈɡriːnhaʊs ɪfekt/", "n", "hiệu ứng nhà kính", "the trapping of heat in the atmosphere", "The greenhouse effect keeps the planet warm."),
        w("renewable", "/rɪˈnjuːəbl/", "adj", "tái tạo", "able to be replaced naturally", "Wind and solar are renewable sources."),
        w("solar", "/ˈsəʊlə(r)/", "adj", "thuộc năng lượng mặt trời", "relating to the sun's energy", "They installed solar panels on the roof."),
        w("wind turbine", "/ˈwɪnd tɜːbaɪn/", "n", "tua-bin gió", "a machine that turns wind into electricity", "The wind turbines stand along the coast."),
        w("crude oil", "/ˌkruːd ˈɔɪl/", "n", "dầu thô", "oil in its natural state before processing", "Crude oil is used to make petrol."),
        w("coal", "/kəʊl/", "n", "than đá", "a black rock burned as fuel", "The old power station burned coal."),
        w("water shortage", "/ˈwɔːtə ʃɔːtɪdʒ/", "n", "sự thiếu nước", "a lack of enough water for people's needs", "The region faces a serious water shortage."),
        w("flash flood", "/ˈflæʃ flʌd/", "n", "lũ quét", "a sudden local flood", "The storm caused flash floods in the valley."),
        w("blaze", "/bleɪz/", "n", "đám cháy lớn", "a large fire that burns strongly", "Firefighters fought the blaze for hours."),
        w("glacier", "/ˈɡlæsiə(r)/", "n", "sông băng", "a large mass of ice that moves slowly", "The glacier has shrunk dramatically."),
        w("coastline", "/ˈkəʊstlaɪn/", "n", "đường bờ biển", "the edge of the land next to the sea", "Erosion is changing the coastline."),
        w("logging", "/ˈlɒɡɪŋ/", "n", "việc khai thác gỗ", "the cutting down of trees for wood", "Logging has damaged the forest."),
        w("carbon dioxide", "/ˌkɑːbən daɪˈɒksaɪd/", "n", "khí carbon dioxide", "the gas produced when carbon is burned", "Trees absorb carbon dioxide from the air."),
        w("low-carbon", "/ˌləʊ ˈkɑːbən/", "adj", "ít carbon", "producing only a small amount of carbon dioxide", "We need low-carbon forms of transport."),
        w("generate", "/ˈdʒenəreɪt/", "v", "sản xuất (điện, năng lượng)", "to produce electricity or energy", "The dam generates electricity for the region."),
        w("hydropower", "/ˈhaɪdrəʊpaʊə(r)/", "n", "thủy điện", "electricity produced from moving water", "Hydropower supplies a third of the country's energy."),
        w("biomass", "/ˈbaɪəʊmæs/", "n", "sinh khối", "plant or animal material used as fuel", "Biomass is an alternative to coal."),
      ],
    },
    {
      title: "Tiêu dùng & lối sống bền vững",
      summary:
        "20 từ/cụm từ về tiêu dùng có trách nhiệm, sản phẩm thân thiện môi trường và thói quen sống xanh.",
      sections: [
        {
          title: "Tiêu dùng có trách nhiệm",
          body: `- **consumption / shopper**: sự tiêu thụ / người mua sắm
- **environmentally friendly / organic**: thân thiện môi trường / hữu cơ
- **local produce / pre-loved**: nông sản địa phương / đồ cũ
- **fair trade / ethical**: thương mại công bằng / có đạo đức
- **durable**: bền

Mẫu câu:
- Buying **pre-loved** clothes reduces **debris**.
- This shop sells only **organic** vegetables.`,
          remember:
            "eco-friendly là thân thiện với môi trường; sustainable là bền vững lâu dài.",
        },
        {
          title: "Thói quen sống xanh",
          body: `- **reuse / reduce / recondition**: tái sử dụng / giảm thiểu / tân trang
- **package / packaging**: đóng gói / bao bì
- **conserve / efficiency**: tiết kiệm, bảo tồn / hiệu quả
- **minimal / energy-saving**: tối thiểu / tiết kiệm năng lượng
- **refill / compost**: đổ đầy lại / ủ phân

Mẫu câu:
- **Reduce**, **reuse**, **upcycle** — in that order.
- Bring a **refill** bottle instead of buying plastic ones.`,
          remember:
            "conserve dùng với nước, năng lượng; preserve dùng với di sản, truyền thống.",
        },
      ],
      words: [
        w("consumption", "/kənˈsʌmpʃn/", "n", "sự tiêu thụ", "the use of goods, energy or food", "Energy consumption falls in warmer months."),
        w("shopper", "/ˈʃɒpə(r)/", "n", "người mua sắm", "a person who buys goods", "Shoppers are choosing greener products."),
        w("environmentally friendly", "/ɪnˌvaɪrənˈmentəli ˈfrendli/", "adj", "thân thiện môi trường", "not harmful to the environment", "The hotel uses environmentally friendly cleaning products."),
        w("organic", "/ɔːˈɡænɪk/", "adj", "hữu cơ", "grown without artificial chemicals", "Organic fruit is often more expensive."),
        w("local produce", "/ˌləʊkl ˈprɒdjuːs/", "n", "nông sản địa phương", "food grown near where it is sold", "The market sells fresh local produce."),
        w("pre-loved", "/ˌpriː ˈlʌvd/", "adj", "đồ cũ (đã qua sử dụng)", "previously owned by someone else", "She bought a pre-loved bicycle."),
        w("reuse", "/ˌriːˈjuːz/", "v", "tái sử dụng", "to use something again", "Reuse your shopping bags."),
        w("reduce", "/rɪˈdjuːs/", "v", "giảm thiểu", "to make something smaller in amount", "We should reduce the amount of paper we use."),
        w("recondition", "/ˌriːkənˈdɪʃn/", "v", "tân trang, phục hồi", "to repair something so it works like new", "It is cheaper to recondition the old machine."),
        w("package", "/ˈpækɪdʒ/", "v/n", "đóng gói; gói hàng", "to wrap goods for sale or transport", "The soap is packaged in paper."),
        w("packaging", "/ˈpækɪdʒɪŋ/", "n", "bao bì", "the material used to wrap goods", "The company reduced its plastic packaging."),
        w("fair trade", "/ˌfeə ˈtreɪd/", "n", "thương mại công bằng", "trade that gives producers a fair price", "This coffee is certified fair trade."),
        w("ethical", "/ˈeθɪkl/", "adj", "có đạo đức, có trách nhiệm", "morally right and fair", "She only buys from ethical brands."),
        w("conserve", "/kənˈsɜːv/", "v", "tiết kiệm, bảo tồn", "to protect something from being wasted or lost", "Turn off the tap to conserve water."),
        w("efficiency", "/ɪˈfɪʃnsi/", "n", "hiệu quả", "the quality of working well without waste", "New appliances improve energy efficiency."),
        w("minimal", "/ˈmɪnɪməl/", "adj", "tối thiểu", "very small in amount", "The building has a minimal impact on the site."),
        w("energy-saving", "/ˈenədʒi seɪvɪŋ/", "adj", "tiết kiệm năng lượng", "designed to use less electricity", "They installed energy-saving lights."),
        w("refill", "/ˌriːˈfɪl/", "v/n", "đổ đầy lại; lần đổ đầy", "to fill a container again", "You can refill your water bottle here."),
        w("compost", "/ˈkɒmpɒst/", "n/v", "phân hữu cơ; ủ phân", "decayed plant material used to improve soil", "We compost vegetable scraps in the garden."),
        w("durable", "/ˈdjʊərəbl/", "adj", "bền", "lasting a long time without breaking", "Durable clothes are better for the planet."),
      ],
    },
    {
      title: "Chính sách & hành động cộng đồng",
      summary:
        "20 từ/cụm từ về luật môi trường, chiến dịch cộng đồng, tài trợ và biện pháp bảo vệ hệ sinh thái.",
      sections: [
        {
          title: "Chính sách và thỏa thuận",
          body: `- **mandate / regulation / legislation**: chỉ thị, chính sách / quy định / pháp luật
- **treaty / summit**: hiệp ước / hội nghị thượng đỉnh
- **scheme / subsidy**: chương trình / trợ cấp
- **funding / penalty**: nguồn tài trợ / hình phạt
- **enforce**: thực thi

Mẫu câu:
- The government introduced a new **mandate** on plastic waste.
- Countries signed a **treaty** to cut emissions.`,
          remember:
            "policy là chính sách nói chung; legislation là hệ thống luật cụ thể.",
        },
        {
          title: "Hành động cộng đồng",
          body: `- **activist / campaign**: nhà hoạt động / chiến dịch
- **petition / protest**: kiến nghị / cuộc phản đối
- **initiative / charity**: sáng kiến / tổ chức từ thiện
- **civic / stewardship**: thuộc cộng đồng / sự gìn giữ
- **preserve / restore**: gìn giữ / phục hồi

Mẫu câu:
- Local **activists** started a **campaign** to clean the river.
- The **initiative** teaches children about **stewardship**.`,
          remember:
            "conservation là bảo tồn tài nguyên thiên nhiên; preservation là giữ nguyên trạng thái.",
        },
      ],
      words: [
        w("mandate", "/ˈmændeɪt/", "n", "chỉ thị, chính sách", "an official instruction or policy", "The council adopted a new recycling mandate."),
        w("regulation", "/ˌreɡjuˈleɪʃn/", "n", "quy định", "an official rule", "New regulations limit factory emissions."),
        w("legislation", "/ˌledʒɪsˈleɪʃn/", "n", "pháp luật", "laws made by a government", "The legislation bans single-use plastics."),
        w("treaty", "/ˈtriːti/", "n", "hiệp ước", "a formal agreement between countries", "The treaty sets targets for reducing emissions."),
        w("summit", "/ˈsʌmɪt/", "n", "hội nghị thượng đỉnh", "a meeting of world leaders", "Climate talks dominated the summit."),
        w("activist", "/ˈæktɪvɪst/", "n", "nhà hoạt động", "a person who campaigns for change", "Activists blocked the entrance to the site."),
        w("campaign", "/kæmˈpeɪn/", "n/v", "chiến dịch; vận động", "a series of actions to achieve a goal", "They launched a campaign against plastic bags."),
        w("petition", "/pəˈtɪʃn/", "n", "kiến nghị", "a written request signed by many people", "Ten thousand people signed the petition."),
        w("protest", "/ˈprəʊtest/", "n/v", "cuộc phản đối; phản đối", "a public show of disagreement", "There was a peaceful protest outside the factory."),
        w("initiative", "/ɪˈnɪʃətɪv/", "n", "sáng kiến", "a new plan to solve a problem", "The tree-planting initiative started last spring."),
        w("scheme", "/skiːm/", "n", "chương trình, kế hoạch", "an official plan or arrangement", "The council runs a bike-sharing scheme."),
        w("subsidy", "/ˈsʌbsədi/", "n", "trợ cấp", "money paid by a government to support something", "Subsidies make solar panels cheaper."),
        w("funding", "/ˈfʌndɪŋ/", "n", "nguồn tài trợ", "money provided for a project", "The project needs more public funding."),
        w("charity", "/ˈtʃærəti/", "n", "tổ chức từ thiện", "an organization that helps people or nature", "The charity plants trees in city parks."),
        w("civic", "/ˈsɪvɪk/", "adj", "thuộc cộng đồng, công dân", "relating to a town and its people", "Civic pride inspired the clean-up campaign."),
        w("stewardship", "/ˈstjuːədʃɪp/", "n", "sự gìn giữ, quản lý có trách nhiệm", "the responsible care of something valuable", "She works in wildlife stewardship."),
        w("preserve", "/prɪˈzɜːv/", "v", "gìn giữ, bảo vệ", "to keep something in its original state", "We must preserve these wetlands."),
        w("restore", "/rɪˈstɔː(r)/", "v", "phục hồi", "to return something to a good condition", "Volunteers restored the damaged riverbank."),
        w("penalty", "/ˈpenəlti/", "n", "hình phạt", "a punishment for breaking a rule", "Companies face heavy penalties for illegal dumping."),
        w("enforce", "/ɪnˈfɔːs/", "v", "thực thi", "to make people obey a law or rule", "It is difficult to enforce the ban."),
      ],
    },
  ],
};
