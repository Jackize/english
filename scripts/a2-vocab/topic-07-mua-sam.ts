import { w } from "./helpers";
import type { SeedVocabTopic } from "../curriculum-data";

/** Chủ đề 07: Mua sắm & tiền bạc. */
export const TOPIC_07: SeedVocabTopic = {
  name: "Mua sắm & tiền bạc",
  slug: "mua-sam-tien-bac",
  icon: "shopping_bag",
  description:
    "Từ vựng về cửa hàng, thanh toán, lập ngân sách và xử lý các vấn đề khi mua hàng.",
  lessons: [
    {
      title: "Cửa hàng & mua sắm",
      summary:
        "20 từ/cụm từ về địa điểm mua sắm, quầy thanh toán, thử đồ và các bước khi đi mua hàng.",
      sections: [
        {
          title: "Nơi mua sắm",
          body: `- **shopping centre / mall**: trung tâm mua sắm
- **boutique**: cửa hàng thời trang nhỏ
- **stall**: quầy hàng, sạp hàng
- **checkout**: quầy thanh toán
- **cashier**: thu ngân

Mẫu câu:
- We spent the afternoon at the **shopping centre**.
- There is a fruit **stall** near the station.`,
          remember: "stall thường là quầy nhỏ ngoài chợ hoặc trên phố.",
        },
        {
          title: "Thử đồ và thanh toán",
          body: `- **try on**: mặc thử
- **fitting room**: phòng thử đồ
- **queue**: xếp hàng
- **receipt**: hoá đơn
- **refund / exchange**: hoàn tiền / đổi hàng
- **bargain / discount**: món hời / giảm giá

Mẫu câu:
- Can I **try on** these shoes?
- Keep the **receipt** in case you need a refund.`,
          remember: "try on phải tách: try it on, không nói try on it.",
        },
      ],
      words: [
        w("shopping centre", "/ˈʃɒpɪŋ sentə(r)/", "n", "trung tâm mua sắm", "a large building with many shops", "The shopping centre is open until nine."),
        w("mall", "/mɔːl/", "n", "trung tâm thương mại", "a large covered shopping area", "They met at the mall after school."),
        w("boutique", "/buːˈtiːk/", "n", "cửa hàng thời trang nhỏ", "a small fashionable shop", "She bought a dress from a boutique."),
        w("stall", "/stɔːl/", "n", "quầy hàng, sạp hàng", "a small open shop or table selling goods", "We bought fresh fruit at a street stall."),
        w("checkout", "/ˈtʃekaʊt/", "n", "quầy thanh toán", "the place where you pay in a shop", "Please pay at the checkout."),
        w("trolley", "/ˈtrɒli/", "n", "xe đẩy hàng", "a metal cart used in a supermarket", "Our trolley was full of groceries."),
        w("basket", "/ˈbɑːskɪt/", "n", "giỏ hàng", "a container used to carry shopping", "I only need a basket for a few things."),
        w("receipt", "/rɪˈsiːt/", "n", "hoá đơn", "a piece of paper proving you paid", "Could I have a receipt, please?"),
        w("refund", "/ˈriːfʌnd/", "n/v", "sự hoàn tiền; hoàn tiền", "money returned for a product; to return money", "I asked for a refund because the shirt was damaged."),
        w("exchange", "/ɪksˈtʃeɪndʒ/", "v/n", "đổi hàng; sự trao đổi", "to give something back for another item", "Can I exchange this jumper for a larger size?"),
        w("try on", "/ˌtraɪ ˈɒn/", "phr v", "mặc thử, thử đồ", "to put on clothes to see if they fit", "May I try on this jacket?"),
        w("fitting room", "/ˈfɪtɪŋ ruːm/", "n", "phòng thử đồ", "a small room where you try on clothes", "The fitting rooms are at the back."),
        w("cashier", "/kæˈʃɪə(r)/", "n", "thu ngân", "a person who takes payments in a shop", "The cashier gave me the wrong change."),
        w("queue", "/kjuː/", "n/v", "hàng chờ; xếp hàng", "a line of people waiting; to wait in a line", "There was a long queue at the checkout."),
        w("bargain", "/ˈbɑːɡən/", "n", "món hời", "something bought for less than its usual price", "This coat was a real bargain."),
        w("discount", "/ˈdɪskaʊnt/", "n", "sự giảm giá", "a reduction in the usual price", "Students get a ten per cent discount."),
        w("sale", "/seɪl/", "n", "đợt giảm giá", "a period when shops sell things cheaply", "I bought these boots in the sale."),
        w("price tag", "/ˈpraɪs tæɡ/", "n", "nhãn giá", "a label showing how much something costs", "The price tag was still on the dress."),
        w("purchase", "/ˈpɜːtʃəs/", "n/v", "việc mua hàng; mua", "something you buy; to buy something", "Keep your receipt as proof of purchase."),
        w("browse", "/braʊz/", "v", "xem hàng, lướt qua", "to look at things without planning to buy", "I like to browse in bookshops."),
      ],
    },
    {
      title: "Tiền & thanh toán",
      summary:
        "20 từ/cụm từ về tiền mặt, thẻ, tỷ giá, rút tiền, chuyển khoản và các khoản phí.",
      sections: [
        {
          title: "Tiền mặt và thẻ",
          body: `- **cash**: tiền mặt
- **coin / banknote**: đồng xu / tờ tiền giấy
- **credit card / debit card**: thẻ tín dụng / thẻ ghi nợ
- **contactless payment**: thanh toán không chạm
- **wallet / purse**: ví nam / ví nữ

Mẫu câu:
- Can I pay in **cash**?
- The shop accepts **contactless payment**.`,
          remember: "wallet thường của nam; purse thường của nữ (Anh-Anh).",
        },
        {
          title: "Ngân hàng và phí",
          body: `- **ATM**: máy rút tiền tự động
- **withdraw**: rút tiền
- **transfer**: chuyển khoản
- **currency / exchange rate**: tiền tệ / tỷ giá
- **tip / tax**: tiền boa / thuế
- **invoice**: hoá đơn (doanh nghiệp)

Mẫu câu:
- I need to **withdraw** some cash.
- The **exchange rate** is better at the bank.`,
          remember: "withdraw money from an account — rút tiền khỏi tài khoản.",
        },
      ],
      words: [
        w("cash", "/kæʃ/", "n", "tiền mặt", "money in the form of coins and notes", "I paid for the coffee in cash."),
        w("coin", "/kɔɪn/", "n", "đồng xu", "a small round piece of metal money", "He collects old coins."),
        w("banknote", "/ˈbæŋknəʊt/", "n", "tờ tiền giấy", "a piece of paper money", "She handed the cashier a ten-pound banknote."),
        w("credit card", "/ˈkredɪt kɑːd/", "n", "thẻ tín dụng", "a card used to buy things and pay later", "I paid by credit card."),
        w("debit card", "/ˈdebɪt kɑːd/", "n", "thẻ ghi nợ", "a card that takes money directly from your account", "Use your debit card at the machine."),
        w("contactless payment", "/ˌkɒntæktləs ˈpeɪmənt/", "n", "thanh toán không chạm", "paying by holding a card near a reader", "Contactless payment is quick and easy."),
        w("wallet", "/ˈwɒlɪt/", "n", "ví (nam)", "a small case for money and cards", "I left my wallet at home."),
        w("purse", "/pɜːs/", "n", "ví (nữ)", "a small bag for money, often used by women", "She took some coins from her purse."),
        w("change", "/tʃeɪndʒ/", "n", "tiền thừa", "the money you get back when you pay too much", "Keep the change."),
        w("currency", "/ˈkʌrənsi/", "n", "đơn vị tiền tệ", "the money used in a country", "What currency do they use in Japan?"),
        w("exchange rate", "/ɪksˈtʃeɪndʒ reɪt/", "n", "tỷ giá hối đoái", "the value of one currency against another", "The exchange rate changed overnight."),
        w("ATM", "/ˌeɪ tiː ˈem/", "n", "máy rút tiền tự động", "a machine that gives you cash", "There is an ATM outside the bank."),
        w("withdraw", "/wɪðˈdrɔː/", "v", "rút tiền", "to take money out of an account", "I withdrew two hundred pounds."),
        w("transfer", "/trænsˈfɜː(r)/", "v/n", "chuyển khoản; sự chuyển", "to move money from one account to another", "She transferred the money this morning."),
        w("tip", "/tɪp/", "n/v", "tiền boa; boa", "extra money given for good service", "We left a small tip for the waiter."),
        w("tax", "/tæks/", "n", "thuế", "money paid to the government", "The price includes tax."),
        w("invoice", "/ˈɪnvɔɪs/", "n", "hoá đơn doanh nghiệp", "a document listing goods and the amount to pay", "Please send the invoice by email."),
        w("loan", "/ləʊn/", "n", "khoản vay", "money borrowed and paid back later", "They took out a loan to buy a car."),
        w("debt", "/det/", "n", "món nợ", "money that you owe", "He is working hard to pay off his debt."),
        w("savings", "/ˈseɪvɪŋz/", "n", "tiền tiết kiệm", "money you keep for the future", "She used her savings to travel."),
      ],
    },
    {
      title: "Chi tiêu & ngân sách",
      summary:
        "20 từ/cụm từ về lập ngân sách, tiết kiệm, chi tiêu hợp lý và phân biệt nhu cầu với xa xỉ.",
      sections: [
        {
          title: "Chi tiêu hợp lý",
          body: `- **budget**: ngân sách
- **afford**: đủ khả năng chi trả
- **spend / save**: chi / tiết kiệm
- **waste**: lãng phí
- **worth**: đáng giá
- **value**: giá trị

Mẫu câu:
- We need to set a monthly **budget**.
- I can't **afford** a new phone right now.`,
          remember: "afford thường đi với can/can't: can afford to buy.",
        },
        {
          title: "Tiết kiệm và ưu tiên",
          body: `- **save up**: để dành tiền
- **pay off**: trả hết nợ
- **overspend**: chi quá mức
- **essential / luxury**: thiết yếu / xa xỉ
- **second-hand**: đồ cũ
- **pocket money**: tiền tiêu vặt
- **bank account / interest**: tài khoản ngân hàng / lãi suất

Mẫu câu:
- I'm **saving up** for a trip to Japan.
- Food is an **essential** expense, not a **luxury**.`,
          remember: "save up for something — để dành tiền cho việc gì.",
        },
      ],
      words: [
        w("budget", "/ˈbʌdʒɪt/", "n/v", "ngân sách; lập ngân sách", "a plan for how to spend money", "We keep a strict monthly budget."),
        w("afford", "/əˈfɔːd/", "v", "đủ khả năng chi trả", "to have enough money for something", "We can't afford a new car this year."),
        w("expensive", "/ɪkˈspensɪv/", "adj", "đắt", "costing a lot of money", "That restaurant is too expensive."),
        w("cheap", "/tʃiːp/", "adj", "rẻ", "costing little money", "The tickets were surprisingly cheap."),
        w("spend", "/spend/", "v", "chi tiêu", "to use money to buy things", "She spends too much on clothes."),
        w("save", "/seɪv/", "v", "tiết kiệm", "to keep money for later", "I try to save some money every month."),
        w("waste", "/weɪst/", "v/n", "lãng phí", "to use money or time badly", "Don't waste money on things you don't need."),
        w("worth", "/wɜːθ/", "adj", "đáng giá", "having a particular value", "The tickets are worth the price."),
        w("value", "/ˈvæljuː/", "n", "giá trị", "how much something is worth", "The value of the house has increased."),
        w("cost", "/kɒst/", "n/v", "chi phí; tốn", "the amount of money needed; to have a price", "The cost of living is rising."),
        w("splurge", "/splɜːdʒ/", "v", "tiêu mạnh tay", "to spend a lot of money on something special", "We splurged on a nice dinner."),
        w("overspend", "/ˌəʊvəˈspend/", "v", "chi quá mức", "to spend more than you planned", "We overspent on holiday."),
        w("save up", "/ˌseɪv ˈʌp/", "phr v", "để dành tiền", "to keep money until you have enough", "She is saving up for a new laptop."),
        w("pay off", "/ˌpeɪ ˈɒf/", "phr v", "trả hết (nợ)", "to finish paying a debt", "It took five years to pay off the loan."),
        w("essential", "/ɪˈsenʃl/", "adj/n", "thiết yếu", "completely necessary", "Water is essential for life."),
        w("luxury", "/ˈlʌkʃəri/", "n", "sự xa xỉ, đồ xa xỉ", "something expensive that is not necessary", "A holiday abroad is a luxury for us."),
        w("second-hand", "/ˌsekənd ˈhænd/", "adj", "đồ cũ", "previously owned by someone else", "I bought a second-hand bike."),
        w("pocket money", "/ˈpɒkɪt mʌni/", "n", "tiền tiêu vặt", "small amount of money for daily spending", "The children earn pocket money by helping at home."),
        w("bank account", "/ˈbæŋk əkaʊnt/", "n", "tài khoản ngân hàng", "an account for keeping money at a bank", "I opened a bank account when I was eighteen."),
        w("interest", "/ˈɪntrəst/", "n", "lãi suất; sự quan tâm", "extra money paid on savings or loans", "The account pays little interest."),
      ],
    },
    {
      title: "Sự cố khi mua hàng",
      summary:
        "20 từ/cụm từ về hàng lỗi, bảo hành, đổi trả, hàng giả, giao hàng và quyền lợi người tiêu dùng.",
      sections: [
        {
          title: "Hàng lỗi và bảo hành",
          body: `- **faulty / defective**: bị lỗi
- **damaged**: bị hư hại
- **warranty / guarantee**: bảo hành / sự bảo đảm
- **return**: trả lại
- **replacement**: hàng thay thế

Mẫu câu:
- The headphones were **faulty**, so I returned them.
- The phone is still under **warranty**.`,
          remember: "under warranty = còn trong thời hạn bảo hành.",
        },
        {
          title: "Mua hàng và khiếu nại",
          body: `- **out of stock / in stock**: hết hàng / còn hàng
- **delivery / order**: giao hàng / đơn hàng
- **online shopping**: mua sắm trực tuyến
- **scam / rip-off**: lừa đảo / giá cắt cổ
- **consumer / customer service**: người tiêu dùng / dịch vụ khách hàng
- **policy**: chính sách

Mẫu câu:
- The item is **out of stock** at the moment.
- I contacted **customer service** about the delay.`,
          remember: "rip-off là giá quá đắt; scam là hành vi lừa đảo.",
        },
      ],
      words: [
        w("faulty", "/ˈfɔːlti/", "adj", "bị lỗi", "not working correctly", "The charger was faulty and didn't work."),
        w("damaged", "/ˈdæmɪdʒd/", "adj", "bị hư hại", "broken or harmed", "The box arrived damaged."),
        w("defective", "/dɪˈfektɪv/", "adj", "bị lỗi sản xuất", "having a manufacturing fault", "The shop replaced the defective product."),
        w("warranty", "/ˈwɒrənti/", "n", "bảo hành", "a promise to repair a product for a period", "The laptop has a two-year warranty."),
        w("guarantee", "/ˌɡærənˈtiː/", "n/v", "sự bảo đảm; bảo đảm", "a promise that something will work", "The watch comes with a money-back guarantee."),
        w("return", "/rɪˈtɜːn/", "v/n", "trả lại; sự trả lại", "to give something back to the shop", "You can return the item within thirty days."),
        w("counterfeit", "/ˈkaʊntəfɪt/", "adj", "giả mạo", "made to look real in order to trick people", "The market was full of counterfeit handbags."),
        w("fake", "/feɪk/", "adj/n", "giả; đồ giả", "not real", "I realised the ticket was fake."),
        w("rip-off", "/ˈrɪp ɒf/", "n", "giá cắt cổ", "something that costs much more than it is worth", "Twenty pounds for a coffee is a rip-off."),
        w("overcharge", "/ˌəʊvəˈtʃɑːdʒ/", "v", "tính giá quá cao", "to ask for more money than is fair", "The taxi driver tried to overcharge us."),
        w("out of stock", "/ˌaʊt əv ˈstɒk/", "phrase", "hết hàng", "not available to buy at the moment", "The shoes are out of stock in my size."),
        w("in stock", "/ˌɪn ˈstɒk/", "phrase", "còn hàng", "available to buy", "The book is in stock online."),
        w("delivery", "/dɪˈlɪvəri/", "n", "việc giao hàng", "the act of bringing goods to a customer", "Delivery usually takes three days."),
        w("order", "/ˈɔːdə(r)/", "n/v", "đơn hàng; đặt hàng", "a request for goods; to ask for goods", "I placed an order for two shirts."),
        w("online shopping", "/ˌɒnlaɪn ˈʃɒpɪŋ/", "n", "mua sắm trực tuyến", "buying things on the internet", "Online shopping is convenient but less personal."),
        w("scam", "/skæm/", "n", "vụ lừa đảo", "dishonest scheme to take money", "The email was a scam."),
        w("consumer", "/kənˈsjuːmə(r)/", "n", "người tiêu dùng", "a person who buys goods or services", "Consumers have the right to a refund."),
        w("customer service", "/ˈkʌstəmə sɜːvɪs/", "n", "dịch vụ khách hàng", "help given to customers by a company", "The customer service team answered quickly."),
        w("replacement", "/rɪˈpleɪsmənt/", "n", "hàng thay thế", "a new item that replaces a faulty one", "They sent a replacement at no extra cost."),
        w("policy", "/ˈpɒləsi/", "n", "chính sách", "a set of rules for a company or organisation", "Read the return policy before you buy."),
      ],
    },
  ],
};
