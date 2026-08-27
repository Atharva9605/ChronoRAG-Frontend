import type { OrderDecision } from "./order";

export type Preset = {
  category: string;
  question: string;
  label: string;
  gold: OrderDecision | "fact";
  verdict: string;
  facts: string[];
  /** For factual presets: regex tested against the answer when checking the book */
  factMatch?: string;
};

export const RAMAYANA_PRESETS: Preset[] = [
  {
    "category": "Flashbacks & Backstory",
    "label": "Shravana Kumar Flashback vs Rama's Exile",
    "question": "Did King Dasharatha accidentally shoot the hermit boy Shravana Kumar in his youth before or after Rama was exiled to the Dandaka forest?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Dasharatha accidentally killed Shravana Kumar in his youth while hunting by sound (pp. 445-451).",
      "He recounts this memory decades later on his deathbed after Rama departs for the forest (pp. 345-353).",
      "Story chronology: the youth hunting accident happened decades BEFORE Rama's exile."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Sambara War Boons vs Kaikeyi Demanding Exile",
    "question": "Did Queen Kaikeyi rescue Dasharatha in the battle against Sambara before or after she demanded Rama's fourteen-year exile?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Kaikeyi saved the wounded King Dasharatha during the ancient war with demon Sambara in Dandaka.",
      "Dasharatha promised her two boons at that time as a reward for saving his life.",
      "Kaikeyi invokes those past boons decades later in Ayodhya to demand Rama's exile."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Ganga River Descent vs Breaking Shiva's Bow",
    "question": "Did King Bhagiratha bring the River Ganga down to Earth before or after Rama broke Lord Shiva's bow in Mithila?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The descent of Ganga is an ancient historical backstory narrated by Vishvamitra (pp. 113-125).",
      "Rama breaks Shiva's bow at King Janaka's court in Mithila in the present storyline (pp. 185-192).",
      "The descent of Ganga happened generations earlier in the Ikshvaku lineage."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Ahalya's Stone Curse vs Rama Freeing Ahalya",
    "question": "Did Sage Gautama curse his wife Ahalya after Indra's deception before or after Rama visited Gautama's hermitage?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Gautama discovered Indra's deceit and cursed Ahalya to remain unseen in penance centuries earlier (p. 142).",
      "Rama enters the hermitage on his journey to Mithila and releases her from the curse (pp. 143-145).",
      "The curse happened long BEFORE Rama arrived to redeem her."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Samudra Manthan (Ocean Churning) vs Rama's Birth",
    "question": "Did the gods and asuras churn the ocean of milk for nectar before or after Lord Rama was born in Ayodhya?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The churning of the cosmic ocean (Samudra Manthan) took place in the primordial Satya Yuga (pp. 133-136).",
      "Rama's birth to Queen Kausalya takes place in Treta Yuga following the Putrakameshti sacrifice (pp. 45-50).",
      "The cosmic churning occurred eons before Rama's birth."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Tataka's Curse by Agastya vs Rama Slaying Tataka",
    "question": "Did Sage Agastya curse the yakshi Tataka to become a fierce demoness before or after Rama killed her in the forest?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Agastya cursed Tataka and Maricha after her husband Sunda died in ancient times (pp. 88-90).",
      "Rama slays Tataka with a deadly arrow upon entering her forest with Vishvamitra (pp. 91-95).",
      "Agastya's curse created the demoness long before Rama faced her."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "King Sagara's 60,000 Sons vs Rama's Birth",
    "question": "Did King Sagara's 60,000 sons get reduced to ashes by Sage Kapila before or after Rama was born?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "King Sagara's sons dug the earth searching for the sacrificial horse and were burned by Kapila (pp. 115-120).",
      "Rama is a descendant of Sagara's dynasty born generations later.",
      "The destruction of Sagara's sons happened in ancestral history before Rama's birth."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Trishanku's Ascent to Heaven vs Breaking Shiva's Bow",
    "question": "Did King Trishanku seek Vishvamitra's aid to enter heaven in his mortal body before or after Rama broke Shiva's bow?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The story of Trishanku and the creation of southern stars was part of Vishvamitra's past austerity (pp. 163-170).",
      "Vishvamitra recounts this past life event while escorting Rama to Mithila.",
      "Trishanku's ascension attempt took place long before the Mithila bow test."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Vishvamitra vs Vashishta (Kamadhenu Cow) vs Tataka Slaying",
    "question": "Did Vishvamitra fight Sage Vashishta over the divine cow Kamadhenu before or after Rama slew Tataka?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Vishvamitra was a king who fought Vashishta over the cow Sabala/Kamadhenu in his youth (pp. 149-160).",
      "Following defeat, he performed thousands of years of penance to become a Brahmarshi.",
      "His conflict with Vashishta happened long before he came to Ayodhya to request Rama's help against Tataka."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Shunahshepa's Sacrifice vs Rama's Marriage to Sita",
    "question": "Did the young boy Shunahshepa escape sacrificial slaughter through Vishvamitra's prayers before or after Rama married Sita?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Shunahshepa was saved by Vishvamitra's mantras during King Ambarisha's horse sacrifice (pp. 171-176).",
      "This ancient legend is narrated by Sadananda at Janaka's palace before the royal weddings.",
      "The Shunahshepa event occurred generations prior to Rama's wedding."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Rishyasringa's Marriage to Shanta vs Putrakameshti Yajna",
    "question": "Did Sage Rishyasringa marry Princess Shanta in Anga before or after performing the Putrakameshti yajna for Dasharatha?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rishyasringa was brought to King Lomapada's realm of Anga to end a drought and married Shanta (pp. 30-38).",
      "After his marriage in Anga, Dasharatha invited him to Ayodhya to conduct the sacrifice for sons (pp. 39-44).",
      "Marriage to Shanta in Anga happened before the sacrifice in Ayodhya."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Indra Slicing Diti's Womb into Maruts vs Sita's Abduction",
    "question": "Did Indra divide Diti's unborn child into the forty-nine Maruts before or after Ravana abducted Sita?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The division of Diti's embryo into Marut storm deities is an ancient Vedic backstory (pp. 137-140).",
      "Sita's abduction occurs in the Dandaka forest during the 13th year of exile in the present storyline (Book III).",
      "Indra and Diti's legend happened in the primordial era."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "King Kusanabha's Daughters vs Rama's Journey with Vishvamitra",
    "question": "Did the Wind-god Vayu deform King Kusanabha's hundred daughters into hunchbacks before or after Rama traveled with Vishvamitra?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The story of Kusanabha's daughters and the founding of Kanyakubja is ancient city lore (pp. 105-109).",
      "Vishvamitra tells Rama the tale as they walk past the city of Kanyakubja.",
      "The event happened in ancestral antiquity before their journey."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Ravana's Boon from Brahma vs Surpanakha Disfigured",
    "question": "Did Ravana obtain his boon of invulnerability from Lord Brahma before or after Lakshmana cut off Surpanakha's nose?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Ravana performed intense tapasya to Brahma and gained protection against gods and demons in the past.",
      "Surpanakha's punishment at Panchavati occurs in the 13th year of Rama's exile (Book III).",
      "Ravana's boon was secured long before the events in Panchavati."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Sage Gautama's Hermitage Abandonment vs Rama's Arrival",
    "question": "Did Sage Gautama abandon his Mithila hermitage to perform tapas in the Himalayas before or after Rama arrived to free Ahalya?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "After cursing Indra and Ahalya, Gautama departed for the snowy Himalayan peaks to practice penance (p. 142).",
      "Rama, Lakshmana, and Vishvamitra enter the deserted hermitage centuries later (p. 143).",
      "Gautama's departure happened before Rama arrived."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Agastya Receiving Divine Weapons vs Giving Them to Rama",
    "question": "Did Sage Agastya receive divine weapons from the gods before or after Rama visited his hermitage in the Dandaka forest?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Agastya was gifted the golden bow of Vishnu, Brahma's arrow, and celestial quivers by the gods.",
      "When Rama visits his ashrama at the start of exile, Agastya bequeaths these weapons to Rama.",
      "Agastya received the weapons before presenting them to Rama."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Parashurama Slaying Kartavirya Arjuna vs Confronting Rama",
    "question": "Did Parashurama annihilate the warrior race twenty-one times before or after he challenged Rama on the road from Mithila?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Parashurama avenged his father Jamadagni by defeating the Kshatriyas in the ancient past.",
      "He intercepts Dasharatha's wedding procession returning from Mithila to test Rama's bow strength.",
      "Parashurama's martial conquests occurred before his meeting with Rama."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Manthara's Old Grudge vs Poisoning Kaikeyi's Mind",
    "question": "Did Manthara develop her resentment toward Rama during his childhood before or after Dasharatha announced the coronation?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Manthara's bitter loyalty to Kaikeyi and jealousy of Rama grew during Rama's youth.",
      "She manipulates Kaikeyi on the eve of the royal consecration ceremony.",
      "Her underlying resentment existed before the coronation announcement."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "King Asvapati Gifting Horses to Bharata vs Dasharatha's Death",
    "question": "Did King Asvapati host Bharata in the kingdom of Kekaya before or after King Dasharatha passed away in Ayodhya?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Bharata and Shatrughna were sent to visit their maternal grandfather King Asvapati in Kekaya before the coronation.",
      "Dasharatha dies in Ayodhya grieving Rama's exile while Bharata is still staying in Kekaya.",
      "Bharata's arrival in Kekaya happened before Dasharatha's death."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Maricha's Prior Defeat at Siddhashrama vs Disguising as Golden Deer",
    "question": "Was Maricha hurled 100 yojanas into the ocean by Rama's arrow at Siddhashrama before or after he transformed into the golden deer?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama struck Maricha with a blunt Manavastra during Vishvamitra's yajna, hurling him into the sea (Book I, pp. 99-103).",
      "Years later at Panchavati, Maricha warns Ravana about Rama's terrifying archery before agreeing to become the deer (Book III).",
      "The Siddhashrama defeat occurred years before the golden deer deception."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Valmiki Creating the Sloka Meter vs Composing the Ramayana",
    "question": "Did Sage Valmiki utter the first spontaneous sloka upon seeing the hunter shoot the krauncha bird before or after composing the 24,000 verses?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Valmiki was moved to grief by the hunter killing the mating krauncha bird on the Tamasa river bank (pp. 11-15).",
      "Lord Brahma appeared and instructed him to use that metric rhythm to compose the entire Ramayana.",
      "The krauncha bird incident and sloka birth happened before composing the epic."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Narada Narrating Rama's Qualities vs Valmiki Composing the Poem",
    "question": "Did Sage Narada describe the ideal virtues of Rama to Valmiki before or after Valmiki taught the poem to Lava and Kusha?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Narada visits Valmiki's hermitage at the very beginning of Book I and summarizes Rama's life (pp. 1-10).",
      "Valmiki later completes the poem and teaches the twin princes Lava and Kusha to sing it.",
      "Narada's recitation happened before the epic was taught to the twins."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Dandaka Forest Hermits' Plea vs Surpanakha Confrontation",
    "question": "Did the sages of Dandaka forest beg Rama for protection against man-eating rakshasas before or after Surpanakha visited Panchavati?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Upon entering the Dandaka forest at the start of exile, the hermits show Rama the bones of slain ascetics and seek protection.",
      "Rama pledges to destroy the demons; Surpanakha attacks their ashrama years later at Panchavati.",
      "The sages' plea occurred before the Surpanakha confrontation."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Sage Sutikshna's Hermitage Visit vs Panchavati Hermitage Setup",
    "question": "Did Rama, Sita, and Lakshmana stay at Sage Sutikshna's hermitage before or after settling at Panchavati on the Godavari?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The royal exiles visited Sage Sutikshna in the early years of wandering through Dandakaranya.",
      "They constructed their thatched cottage at Panchavati near the Godavari River in their thirteenth year.",
      "Sutikshna's ashrama visit happened before settling at Panchavati."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Kabandha's Celestial Form Cursed vs Rama Slaying Kabandha",
    "question": "Was the celestial gandharva Danu cursed by Indra to take the headless demon form Kabandha before or after Rama severed his arms?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Danu was cursed to become the monstrous Kabandha with a gaping belly-mouth in the ancient past.",
      "Rama and Lakshmana chop off his enormous arms when he grabs them in the forest after Sita's abduction.",
      "The curse transforming him into Kabandha occurred long before Rama severed his arms."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Viradha's Celestial Curse by Kubera vs Rama Burying Viradha",
    "question": "Was the gandharva Tumburu cursed by Kubera to become the demon Viradha before or after Rama buried him in a pit?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Tumburu was cursed by Kubera for falling in love with Rambha to become the demon Viradha.",
      "Rama and Lakshmana break his limbs and bury him in a deep pit in the forest to grant him liberation.",
      "Kubera's curse took place before Rama fought and buried him."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Shabari Waiting for Rama vs Rama Visiting Shabari's Ashrama",
    "question": "Did the pious ascetic Shabari spend decades tending the hermitage of Sage Matanga before or after Rama arrived at Lake Pampa?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Shabari lived at Sage Matanga's hermitage for years awaiting Rama's arrival as prophesied by her guru.",
      "Rama and Lakshmana visit her after Kabandha's cremation on their way to Mount Rishyamukha.",
      "Shabari's decades of devotion occurred before Rama's arrival."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Jatayu's Friendship with Dasharatha vs Meeting Rama at Panchavati",
    "question": "Did the noble vulture king Jatayu establish friendship with King Dasharatha before or after meeting Rama at Panchavati?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Jatayu was an old ally and friend of King Dasharatha from their youthful campaigns.",
      "He introduces himself to Rama and Lakshmana in the forest as their father's dear friend.",
      "Jatayu's friendship with Dasharatha was established decades before meeting Rama."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Dushana's Vanguard Attack vs Khara's Final Defeat",
    "question": "Did Dushana lead his demon horde against Rama before or after Khara hurled his fiery mace at Rama?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Dushana attacked with 5,000 warriors to reinforce the army and was slain first by Rama's arrows.",
      "Khara fought as the supreme commander and hurled his blazing mace in the final duel after Dushana fell.",
      "Dushana's battle took place before Khara's final attack."
    ]
  },
  {
    "category": "Flashbacks & Backstory",
    "label": "Sage Kapila's Eternal Meditation vs Bhagiratha's Penance",
    "question": "Did Sage Kapila enter deep meditation in Patala before or after Bhagiratha practiced austerities at Gokarna?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Kapila was meditating in the underworld when King Sagara's sons discovered the sacrificial horse.",
      "King Bhagiratha performed thousand-year penances generations later to bring Ganga down to purify their ashes.",
      "Kapila's meditation in Patala preceded Bhagiratha's penance."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Putrakameshti Yajna vs Four Princes Born",
    "question": "Did King Dasharatha conclude the Putrakameshti sacrifice before or after the four divine sons were born in Ayodhya?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The Putrakameshti sacrifice is performed with Rishyasringa, yielding the divine payasam dessert (pp. 39-44).",
      "Nine months later, Rama is born to Kausalya, Bharata to Kaikeyi, and Lakshmana & Shatrughna to Sumitra (pp. 45-50).",
      "Sacrifice concluded first; the birth of the princes followed."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Vishvamitra Demanding Rama vs Tataka Slaying",
    "question": "Did Sage Vishvamitra arrive in Dasharatha's court to request Rama before or after Rama slew Tataka in the forest?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Vishvamitra comes to Ayodhya asking for 16-year-old Rama to protect his sacrifice from demons (pp. 75-82).",
      "Dasharatha reluctantly permits Rama and Lakshmana to depart with the sage.",
      "They enter the forest of Tataka on their way to Siddhashrama and slay her."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Bala and Atibala Mantras vs Siddhashrama Yajna",
    "question": "Did Vishvamitra teach Rama and Lakshmana the Bala and Atibala secret mantras before or after protecting the Siddhashrama yajna?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Vishvamitra transmits the Bala and Atibala mantras of endurance on the banks of the Sarayu (p. 85).",
      "They arrive at Siddhashrama later and guard the sacrificial altar for six days and nights.",
      "Mantras taught at the riverbank before the sacrificial defense."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Subahu Slain by Agneyastra vs Journey to Mithila",
    "question": "Did Rama kill the demon Subahu with the fire-missile Agneyastra before or after departing with Vishvamitra for Mithila?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama slays Subahu and scatters Maricha's host at Siddhashrama (pp. 99-103).",
      "With the sacrifice successfully completed, Vishvamitra invites Rama to witness the great bow in Mithila.",
      "Subahu's death occurred before setting out for Mithila."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Crossing the Son River vs Slaying Tataka",
    "question": "Did Rama, Lakshmana, and Vishvamitra camp at the River Son before or after Rama slew the demoness Tataka?",
    "gold": "after",
    "verdict": "After",
    "facts": [
      "Tataka was slain in the Malada and Karusha forests before reaching Siddhashrama (pp. 90-95).",
      "After Siddhashrama, the party journeyed toward Mithila and camped on the fertile banks of the River Son (p. 104).",
      "Camping at the Son happened AFTER slaying Tataka."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Ahalya's Redemption vs Arrival at Mithila City",
    "question": "Did Rama free Ahalya from her curse before or after King Janaka welcomed them to his sacrificial hall in Mithila?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama enters Gautama's deserted hermitage near the outskirts and frees Ahalya (pp. 142-145).",
      "King Janaka and his royal preceptor Sadananda receive them at the city sacrificial arena afterward (pp. 146-150).",
      "Ahalya's redemption happened before entering Janaka's presence."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Sadananda Reciting Vishvamitra's Past vs Shiva's Bow Displayed",
    "question": "Did Gautama's son Sadananda narrate Vishvamitra's austerities before or after King Janaka ordered the eight-wheeled iron chest brought out?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Sadananda thanks Rama for redeeming his mother Ahalya and recites Vishvamitra's glory (pp. 148-180).",
      "The following morning, Janaka orders five thousand men to wheel in the heavy iron case holding Shiva's bow.",
      "Sadananda's discourse preceded the display of the bow."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Lifting Shiva's Bow vs Snapping the Bow in Two",
    "question": "Did Rama effortlessly string Lord Shiva's celestial bow before or after it broke with a crash like thunder?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama grasps the enormous bow by the middle, lifts it easily, and bends it to attach the string (p. 188).",
      "As he draws the string toward his ear with immense power, the bow snaps in half with an earth-shattering boom.",
      "Stringing and bending occurred right before the break."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Janaka's Envoys Sent to Ayodhya vs Dasharatha's Arrival in Mithila",
    "question": "Did King Janaka's swift messengers ride to Ayodhya with wedding tidings before or after King Dasharatha arrived in Mithila?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Following the bow-breaking, Janaka sends fast charioteers to Ayodhya to invite King Dasharatha (pp. 190-193).",
      "Dasharatha assembles his royal retinue, treasury, and armies to travel to Mithila for the quadruple wedding.",
      "Messengers delivered the news before Dasharatha's arrival."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Four Royal Marriages in Mithila vs Parashurama's Challenge",
    "question": "Did the four sons of Dasharatha marry the four princesses of Mithila before or after Parashurama challenged Rama on the road?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama marries Sita, Lakshmana marries Urmila, Bharata marries Mandavi, and Shatrughna marries Shrutakirti (pp. 200-205).",
      "As the wedding caravan travels back to Ayodhya, the fierce sage Parashurama blocks their path with Vishnu's bow.",
      "The quadruple wedding took place before Parashurama's encounter."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Parashurama's Vishnu Bow Strung vs Return to Ayodhya",
    "question": "Did Rama string Vishnu's bow and shoot Parashurama's celestial realms before or after the royal party entered Ayodhya?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama takes the Vaishnava bow from Parashurama, strings it, and consumes his spiritual merits with an arrow (pp. 208-212).",
      "Parashurama bows in humility and departs to Mount Mahendra; the party safely enters Ayodhya amid festivities.",
      "The bow test on the forest road occurred before entering Ayodhya."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Bharata Departing for Kekaya vs Coronation Announcement",
    "question": "Did Bharata and Shatrughna leave Ayodhya for their uncle Yudhajit's realm of Kekaya before or after Dasharatha decided to crown Rama?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Bharata accompanies Prince Yudhajit to visit King Asvapati in the distant western kingdom of Kekaya (p. 215).",
      "In Bharata's absence, King Dasharatha perceives ominous planetary omens and resolves to consecrate Rama as Yuvaraja.",
      "Bharata's departure to Kekaya occurred before the coronation council."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Vishvamitra Receiving Divine Weapons vs Giving Weapons to Rama",
    "question": "Did Lord Shiva bestow divine astras upon Vishvamitra before or after Vishvamitra bestowed those weapons upon young Rama?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Vishvamitra pleased Lord Shiva through penances and acquired the mastery of all cosmic weapons (p. 160).",
      "After Rama slays Tataka, Vishvamitra joyfully hands over dozens of celestial astras to Rama (pp. 95-98).",
      "Vishvamitra obtained the astras before gifting them to Rama."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Vishvamitra's 1,000-Year Vow of Silence vs Attaining Brahmarshi Title",
    "question": "Did Vishvamitra maintain unbroken silence and fasting at Pushkar before or after Lord Brahma addressed him as Brahmarshi?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Vishvamitra underwent supreme mortification, suppressing breath, anger, and speech at holy Lake Pushkar.",
      "Pleased by his faultless control, Brahma and Sage Vashishta crowned his achievement by calling him Brahmarshi.",
      "The silent austerity was completed before attaining the Brahmarshi status."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Indra Seducing Rambha vs Vishvamitra's Curse on Rambha",
    "question": "Did Indra send the apsara Rambha to distract Vishvamitra before or after Vishvamitra cursed Rambha to turn into a rock?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Indra dispatched the celestial nymph Rambha to entice Vishvamitra and break his fierce penance.",
      "Vishvamitra saw through the trap and cursed Rambha to stand as an immovable stone statue for ten thousand years.",
      "Indra's seduction attempt came before the petrifying curse."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "City of Kanyakubja Founded vs Story Narrated to Rama",
    "question": "Was the city of Kanyakubja founded by King Kusanabha before or after Vishvamitra told Rama its history on the riverbank?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Kusanabha built the prosperous city of Kanyakubja for his hunchbacked daughters in ancient times.",
      "Vishvamitra narrates this city history centuries later as they pass by on their trek to Mithila.",
      "The founding of Kanyakubja happened before the narration to Rama."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Menaka Distracting Vishvamitra vs Birth of Shakuntala",
    "question": "Did the nymph Menaka seduce Vishvamitra at Lake Pushkar before or after Vishvamitra resolved to restart his severed penance?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Menaka captivated Vishvamitra at Lake Pushkar, causing him to live in worldly pleasure for ten years.",
      "Realizing his wasted spiritual power, Vishvamitra renounced the union and headed to the northern mountains to resume tapas.",
      "The seduction by Menaka preceded his remorse and departure."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Janaka Finding Sita in the Furrow vs Rama Breaking Shiva's Bow",
    "question": "Did King Janaka discover baby Sita in a furrow while ploughing the sacrificial ground before or after Rama broke Shiva's bow?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Janaka ploughed the sacred earth for a yajna and found infant Sita rising from the furrow, raising her as his daughter (p. 185).",
      "Years later, Janaka set the condition that whoever strings Lord Shiva's bow would win Sita's hand in marriage.",
      "Discovering Sita in the furrow occurred during her infancy before the bow contest."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Sita's Foster Mother Sunayana vs Marriage Rituals",
    "question": "Did Queen Sunayana raise Sita in Janakpur before or after Sita circled the sacred wedding fire with Rama?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Queen Sunayana nurtured and educated Sita in the royal palace of Mithila from childhood.",
      "Sita and Rama take the seven steps around the consecrated Agni fire in the wedding pavilion.",
      "Childhood upbringing preceded the wedding ceremony."
    ]
  },
  {
    "category": "Book I (Bala Kanda)",
    "label": "Vishvamitra Blesses Rama vs Vishvamitra Returns to the North",
    "question": "Did Vishvamitra bless the newlyweds in Mithila before or after he retired to the northern mountains?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Vishvamitra witnessed the wedding of Rama and Sita, showered divine blessings upon both royal houses (p. 206).",
      "Having fulfilled his mission, he took leave of King Janaka and Dasharatha and traveled to the northern Himalayan heights.",
      "Blessing the couple occurred before his final departure."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Dasharatha's Council Assembly vs Manthara's Instigation",
    "question": "Did King Dasharatha proclaim Rama's coronation before his ministers before or after Manthara spotted the city decorations?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Dasharatha convenes the assembly of kings, citizens, and elders, unanimously approving Rama's consecration (pp. 218-225).",
      "Manthara sees the citizens hanging flower garlands, burning incense, and inquiring from a nurse learns of Rama's festival (pp. 230-235).",
      "The council proclamation occurred before Manthara noticed the decorations."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Manthara Poisoning Kaikeyi vs Kaikeyi Entering the Mourning Chamber",
    "question": "Did the hunchback Manthara persuade Kaikeyi to claim her two boons before or after Kaikeyi cast off her jewels in the chamber of wrath?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Manthara warns Kaikeyi of Kausalya's supremacy and instructs her how to extract the boons (pp. 235-242).",
      "Kaikeyi follows the wicked advice, tearing off her royal necklaces and lying on the bare floor of the anger chamber (Krodhagriha).",
      "Manthara's persuasion occurred before Kaikeyi entered the mourning chamber."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Dasharatha Fainting in Grief vs Sunrise on Coronation Day",
    "question": "Did King Dasharatha collapse in anguish at Kaikeyi's demands before or after the morning heralds sounded the coronation trumpets?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Dasharatha weeps, pleads, and falls unconscious overnight when Kaikeyi refuses to relent on Rama's exile (pp. 245-255).",
      "At daybreak, sage Vashishta and the royal bards arrive at the palace gates playing drums and singing morning hymns.",
      "Dasharatha's grief-stricken collapse happened overnight before sunrise."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Sumantra Summoning Rama vs Rama Learning of the Exile",
    "question": "Did the royal charioteer Sumantra escort Rama from his palace to Dasharatha before or after Kaikeyi announced the 14-year exile to Rama?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Sumantra drives the chariot to Rama's residence to bring him to his father's presence (pp. 258-264).",
      "Inside the chamber, Kaikeyi directly tells Rama of the king's promise and commands him to depart for Dandaka.",
      "Sumantra summoned Rama before Kaikeyi delivered the exile command."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Rama Breaking the News to Kausalya vs Lakshmana's Fury",
    "question": "Did Queen Kausalya collapse upon hearing Rama's exile before or after Lakshmana offered to seize the throne by force of arms?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama visits mother Kausalya's quarters and reveals that he must dwell in the Dandaka forest for fourteen years (pp. 270-275).",
      "Enraged by the injustice, Lakshmana strings his bow and offers to kill anyone who opposes Rama's coronation.",
      "Kausalya's collapse occurred before Lakshmana proposed his armed rebellion."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Sita Pleading to Accompany Rama vs Giving Away Royal Wealth",
    "question": "Did Sita convince Rama to let her accompany him into the wilderness before or after they distributed their riches to the brahmins?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Sita passionately argues that a wife's place is alongside her husband in joy or sorrow, winning Rama's consent (pp. 285-292).",
      "Rama, Sita, and Lakshmana open the palace treasuries, donating cattle, gold, silks, and chariots to the poor and priests (pp. 293-300).",
      "Sita's plea was accepted before distributing the wealth."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Kaikeyi Handing Bark Garments vs Citizens Weeping in Streets",
    "question": "Did Kaikeyi hand coarse bark garments (valkala) to Rama, Sita, and Lakshmana before or after they mounted Sumantra's exile chariot?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Kaikeyi shamelessly brings out forest bark robes in the royal assembly for the princes and Sita to wear (pp. 305-310).",
      "Dressed as hermits, the three step into Sumantra's chariot while the citizens of Ayodhya run behind them crying in grief.",
      "Donning the bark robes occurred before mounting the chariot."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Crossing the Tamasa River vs Slipping Away at Night",
    "question": "Did the citizens of Ayodhya camp overnight at the River Tamasa before or after Rama quietly slipped away while they slept?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Thousands of Ayodhya citizens follow Rama's chariot and fall asleep on the grassy banks of the Tamasa River (pp. 315-320).",
      "To spare the citizens further suffering, Rama instructs Sumantra to drive quietly across the river before dawn.",
      "Camping at the Tamasa preceded the secret pre-dawn departure."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Meeting Nishada King Guha at Sringaverapura vs Crossing the Ganga",
    "question": "Did the tribal chieftain Guha welcome Rama with fruit and honey at Sringaverapura before or after they crossed the Ganga by boat?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Guha rushes to meet his beloved friend Rama under an ingudi tree at Sringaverapura (pp. 325-330).",
      "The following morning, Guha prepares a large boat and rows Rama, Sita, and Lakshmana across the holy Ganga.",
      "The meeting at Sringaverapura happened before crossing the river."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Applying Banyan Milk to Matt Hair vs Crossing the Yamuna on Raft",
    "question": "Did Rama and Lakshmana apply banyan tree sap to mat their hair like ascetics before or after building the wooden raft on the Yamuna?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Before boarding Guha's boat, Rama requests banyan milk from Guha and mats his locks into jata (p. 332).",
      "They journey further to Prayaga, receive guidance from Sage Bharadvaja, and build a log raft to cross the Yamuna.",
      "Matting hair with banyan sap occurred before crossing the Yamuna."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Visiting Sage Bharadvaja at Prayaga vs Building Hut on Mount Chitrakoota",
    "question": "Did Rama consult Sage Bharadvaja at the confluence of the rivers before or after Lakshmana built the thatched cottage on Mount Chitrakoota?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Bharadvaja welcomes the exiles at Prayaga (Triveni Sangam) and advises them to settle on serene Mount Chitrakoota (pp. 335-340).",
      "Following his counsel, they cross the Yamuna and Lakshmana builds an auspicious leaf-thatched hermitage on Chitrakoota.",
      "Consulting Bharadvaja occurred before building the hut."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Sumantra Returning Alone to Ayodhya vs Dasharatha's Demise",
    "question": "Did the charioteer Sumantra return empty-handed to Ayodhya before or after King Dasharatha breathed his last?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Sumantra drives the empty chariot back into the mourning city and delivers Rama's message to Dasharatha (pp. 341-348).",
      "Hearing that Rama has crossed into the deep forest, Dasharatha recounts the curse of Shravana Kumar's parents and dies at midnight.",
      "Sumantra's return occurred before Dasharatha's death."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Preserving Dasharatha's Body in Oil Trough vs Messengers Sent to Kekaya",
    "question": "Did the royal ministers place Dasharatha's body in an oil vat before or after dispatching messengers to fetch Prince Bharata?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "To prevent decomposition before a son arrives for funeral rites, priests immerse Dasharatha's body in an oil trough (p. 355).",
      "Swift envoys (Siddhartha and others) are dispatched to the western kingdom of Kekaya with instructions not to reveal the death.",
      "Placing the body in oil happened before the messengers rode out."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Bharata's Ominous Dream in Kekaya vs Arriving in Ayodhya",
    "question": "Did Bharata dream of his father falling from a cliff smeared with cow dung before or after reaching the gates of Ayodhya?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "In his grandfather's palace at Girivraja, Bharata wakes in terror from a nightmare foreboding death in the family (pp. 360-365).",
      "The messengers arrive that morning and Bharata rides for seven days back to Ayodhya.",
      "The ominous dream occurred in Kekaya before arriving in Ayodhya."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Bharata Rebuking Kaikeyi vs Shatrughna Beating Manthara",
    "question": "Did Bharata denounce his mother Kaikeyi as a husband-killer before or after Shatrughna dragged Manthara by her hump?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Bharata learns from Kaikeyi that Dasharatha is dead and Rama exiled, cursing her for ruining the royal house (pp. 370-380).",
      "Seeing Manthara adorned in royal jewels, Shatrughna seizes her and drags her across the floor in fury until Bharata stops him.",
      "Rebuking Kaikeyi happened before Shatrughna confronted Manthara."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Dasharatha's Cremation Rites vs Bharata Marching to Chitrakoota",
    "question": "Did Bharata perform the cremation and shraddha ceremonies for King Dasharatha before or after marching his army to Chitrakoota?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Bharata and Shatrughna cremate Dasharatha on the Sarayu and complete the thirteen-day funeral shraddha (pp. 382-390).",
      "Refusing the crown, Bharata leads the entire city, queen mothers, and army into the forest to bring Rama back.",
      "Funeral ceremonies were completed before marching to Chitrakoota."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Guha Suspecting Bharata's Army vs Guha Guiding Bharata",
    "question": "Did King Guha assemble 500 armed boats suspecting Bharata intended harm before or after realizing Bharata came in devotion?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Guha spots the massive army flags at Sringaverapura and orders his archers to prepare for battle (pp. 395-400).",
      "Meeting Bharata dressed in ascetic garb and weeping for Rama, Guha dissolves into tears and offers guidance.",
      "Suspecting hostility occurred before realizing Bharata's noble devotion."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Bharadvaja's Magical Feast vs Reaching Mount Chitrakoota",
    "question": "Did Sage Bharadvaja invoke celestial Gandharvas to feast Bharata's entire army at Prayaga before or after they reached Mount Chitrakoota?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Bharadvaja summons Vishvakarma, celestial apsaras, and divine foods to feast Bharata's massive retinue overnight (pp. 405-415).",
      "The following morning, they continue marching through the woods until they reach the foothills of Chitrakoota.",
      "The miraculous feast at Prayaga occurred before reaching Chitrakoota."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Lakshmana Climbing Tree in Suspicion vs Bharata's Prostration",
    "question": "Did Lakshmana climb a tall sala tree with his bow seeing the army dust before or after Bharata fell weeping at Rama's feet?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Lakshmana climbs a tree, spots the Kovidara flag of Ayodhya, and vows to slay Bharata in battle (pp. 420-425).",
      "Rama calms him; Bharata approaches on foot through the forest and collapses at Rama's feet in tears.",
      "Climbing the tree in suspicion happened before Bharata's prostration."
    ]
  },
  {
    "category": "Book II (Ayodhya Kanda)",
    "label": "Bharata Receiving Rama's Padukas (Sandals) vs Returning to Nandigrama",
    "question": "Did Bharata place Rama's golden wooden sandals (Padukas) on his head before or after establishing his hermitage rule at Nandigrama?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "When Rama refuses to break his father's vow, Bharata requests his wooden sandals as the true sovereign of the realm (pp. 435-442).",
      "Bharata places the sandals upon his head, returns to the kingdom, and governs from the village of Nandigrama as their servant.",
      "Receiving the sandals at Chitrakoota happened before ruling from Nandigrama."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Departing Chitrakoota for Dandaka vs Slaying Demon Viradha",
    "question": "Did Rama, Sita, and Lakshmana leave Mount Chitrakoota to visit Sage Atri before or after fighting the demon Viradha in the forest?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "The exiles visit Sage Atri and Anasuya at the end of Book II before penetrating into the deep Dandaka forest.",
      "In the deep Dandaka wilderness, the terrifying monster Viradha seizes Sita and battles the princes (pp. 455-462).",
      "Departing Chitrakoota occurred before the battle with Viradha."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Anasuya Gifting Everlasting Robes to Sita vs Viradha Battle",
    "question": "Did the venerable ascetic Anasuya gift divine unwithering garments and celestial ointments to Sita before or after Viradha seized Sita?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Atri's wife Anasuya praised Sita's wifely virtue and gifted her divine radiant garments that never fade or soil.",
      "Sita wears these celestial robes when the demon Viradha attacks them in the forest.",
      "Anasuya's gifts were bestowed before the encounter with Viradha."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Sage Sarabhanga Ascending to Brahmaloka vs Visiting Sage Sutikshna",
    "question": "Did Sage Sarabhanga cast off his mortal body into sacred fire in Rama's presence before or after Rama visited Sage Sutikshna?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Sage Sarabhanga waited for Rama's darshan before immolating himself in the yajna fire and ascending to heaven in youth (pp. 465-470).",
      "Rama directs his path toward the hermitage of Sage Sutikshna as instructed by Sarabhanga.",
      "Sarabhanga's ascension occurred before visiting Sutikshna."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Agastya Recommending Panchavati vs Lakshmana Building Cottage",
    "question": "Did Sage Agastya describe the fruit-laden groves of Panchavati before or after Lakshmana erected the cottage on the Godavari?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Sage Agastya instructs Rama to spend the remaining years of exile at Panchavati near the clear waters of the Godavari.",
      "The princes travel two leagues, meet Jatayu on the path, and Lakshmana builds their sturdy leaf-hut.",
      "Agastya's recommendation occurred before building the cottage."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Surpanakha Propositioning Rama vs Surpanakha Disfigured",
    "question": "Did the demoness Surpanakha demand Rama become her husband before or after Lakshmana cut off her ears and nose?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Surpanakha assumes a charming disguise and propositions Rama, mocking Sita's frail beauty.",
      "When she lunges to devour Sita in fury, Rama commands Lakshmana, who draws his sword and disfigures her.",
      "Her marriage proposal occurred before her disfigurement."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Fourteen Rakshasa Champions Slain vs Khara Mobilizing Army",
    "question": "Did Rama kill the fourteen demon champions sent by Khara before or after Khara mobilized his entire army of 14,000 warriors?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Surpanakha first brought 14 fierce rakshasa warriors to avenge her, and Rama pierced their hearts with arrows.",
      "Horrified by their instantaneous death, Khara marshaled his full army of 14,000 at Janasthana.",
      "Slaying the fourteen champions preceded mobilizing the full army."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Dushana's Death vs Khara's Destruction at Janasthana",
    "question": "Did Rama slay the demon general Dushana before or after slaying King Khara in single combat?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Dushana attacked with golden maces and was shot through the limbs by Rama's Gandharva astra.",
      "Khara was the last surviving leader, slain by Rama's fiery arrow that pierced his breastplate.",
      "Dushana fell in battle before Khara."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Akampana Reporting Janasthana Massacre vs Ravana Visiting Maricha",
    "question": "Did the surviving scout Akampana report the annihilation of Janasthana to Ravana before or after Ravana rode to Maricha's ashrama?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Akampana flies to Lanka and warns Ravana that one man destroyed 14,000 warriors, suggesting Sita's abduction as the only weakness.",
      "Ravana mounts his aerial chariot and flies across the ocean to recruit Maricha's magical shape-shifting.",
      "Akampana's battlefield report happened before visiting Maricha."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Maricha Warning Ravana vs Maricha Transforming into Golden Deer",
    "question": "Did Maricha desperately urge Ravana not to provoke Rama before or after transforming into the silver-spotted golden deer?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Maricha warned Ravana that Rama is righteousness incarnate and that attacking him would burn Lanka to ashes.",
      "When Ravana threatened to execute him immediately on the spot, Maricha chose death by Rama's arrow and took deer form.",
      "Warning Ravana occurred before the transformation."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Sita Entranced by Golden Deer vs Rama Chasing the Deer",
    "question": "Did Sita plead with Rama to capture the golden deer alive before or after Rama pursued it deep into the forest?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Sita sees the deer sparkling with jewels and begs Rama to catch it for their hermitage or take its pelt.",
      "Rama entrusts Sita's safety to Lakshmana and follows the elusive deer through dense thickets.",
      "Sita's entreaty happened before the forest chase."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Maricha Mimicking Rama's Voice vs Lakshmana Leaving the Ashrama",
    "question": "Did the dying Maricha cry out 'Ah Sita! Ah Lakshmana!' in Rama's voice before or after Lakshmana departed to find his brother?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Pierced by Rama's golden arrow, Maricha assumes his monstrous body and cries out in Rama's exact voice.",
      "Hearing the cry, Sita panics and accuses Lakshmana of wanting Rama dead, forcing Lakshmana to leave her side.",
      "The deceptive cry in Rama's voice happened before Lakshmana departed."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Ravana Appearing as Sannyasi (Mendicant) vs Seizing Sita",
    "question": "Did Ravana approach the Panchavati hut disguised in saffron robes holding a staff before or after grabbing Sita by her hair?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "With both brothers gone, Ravana approaches as a wandering sannyasi chanting Vedic verses, receiving hospitality.",
      "When Sita reveals her lineage, Ravana boasts of his ten heads, sheds his disguise, and grabs her into his aerial chariot.",
      "The mendicant disguise preceded the violent abduction."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Jatayu Intercepting Ravana's Chariot vs Ravana Severing Jatayu's Wings",
    "question": "Did the king of vultures Jatayu smash Ravana's gem-studded chariot in mid-air before or after Ravana sliced off his wings?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Jatayu attacks Ravana in the sky with beak and talons, shattering his bow, slaying the donkeys, and breaking the chariot.",
      "Ravana draws his sword Chandrah\u0101sa and slices through Jatayu's wings and talons, leaving him bleeding on the ground.",
      "Smashing the chariot occurred before his wings were severed."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Sita Dropping Her Silken Veil on Rishyamukha vs Imprisonment in Ashoka Vatika",
    "question": "Did Sita drop her yellow silken veil and jewels among five monkeys on a mountain peak before or after Ravana placed her in Ashoka Vatika?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "As Ravana flies southward, Sita spots five monkeys on Mount Rishyamukha and drops her golden scarf and ornaments.",
      "Ravana lands in Lanka, shows her his palace splendor, and locks her in the Ashoka grove guarded by rakshasis.",
      "Dropping the ornaments occurred in mid-flight before imprisonment in Lanka."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Rama Meeting Lakshmana on Forest Path vs Finding Empty Hermitage",
    "question": "Did Rama encounter Lakshmana hurrying along the forest trail before or after they discovered the empty hermitage at Panchavati?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Returning after slaying Maricha, Rama meets Lakshmana alone on the path and foresees disaster.",
      "They run back to the thatched cottage together, finding the floor strewn with torn flowers and Sita vanished.",
      "Meeting Lakshmana on the trail happened before inspecting the empty hut."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Finding Jatayu Bleeding in the Dust vs Performing Jatayu's Funeral Rites",
    "question": "Did the dying Jatayu inform Rama that Ravana took Sita south before or after Rama performed his funeral cremation rites?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama finds the wounded Jatayu, who gasps out that Ravana, king of Lanka, abducted Sita in the Muhurta called Vinda.",
      "After Jatayu dies, Rama and Lakshmana build a pyre with fragrant sandalwood and conduct complete Vedic funeral rites.",
      "Jatayu's disclosure occurred before his cremation."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Kabandha Trapping the Brothers vs Slaying and Burning Kabandha",
    "question": "Did the headless monster Kabandha trap Rama and Lakshmana in his mile-long arms before or after they severed his shoulders?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "In the dense Krauncha forest, Kabandha ensnares both brothers simultaneously with his gigantic arms.",
      "At Rama's signal, both brothers draw their sharp swords and cut off his right and left arms at the shoulder.",
      "Trapping them occurred before severing his arms."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Kabandha Advising Alliance with Sugriva vs Visiting Lake Pampa",
    "question": "Did the liberated spirit of Kabandha advise Rama to ally with the exiled Vanara king Sugriva before or after reaching Lake Pampa?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rising from the funeral pyre in celestial form, Kabandha tells Rama to seek Sugriva on Mount Rishyamukha.",
      "Rama and Lakshmana journey onward through the Matanga forest and arrive at the lotus-covered shores of Lake Pampa.",
      "Kabandha's advice preceded their arrival at Lake Pampa."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Shabari Offering Berries vs Shabari Ascending into Sacred Fire",
    "question": "Did the elderly hermitess Shabari present wild forest fruits to Rama before or after she entered the blazing fire to attain liberation?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Shabari washes Rama's feet and offers him sweet forest fruits collected over years of devoted waiting.",
      "Having seen Lord Rama, she receives his blessing, enters the sacred fire, and ascends to the divine realm of sages.",
      "Offering fruits occurred before entering the fire."
    ]
  },
  {
    "category": "Book III (Aranya Kanda)",
    "label": "Arriving at Lake Pampa vs Spotting Sugriva on Mount Rishyamukha",
    "question": "Did Rama lament his separation from Sita beside the blooming lotus blossoms of Lake Pampa before or after reaching Rishyamukha?",
    "gold": "before",
    "verdict": "Before",
    "facts": [
      "Rama weeps for Sita while watching the peacocks and blooming lotus flowers at Lake Pampa in spring.",
      "After resting at Pampa, the brothers approach the foot of Mount Rishyamukha where Sugriva spots them.",
      "Lamenting at Lake Pampa occurred before approaching Rishyamukha."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 14 Years Exile",
    "question": "For how many years was Rama commanded to live in exile in the forest by Queen Kaikeyi?",
    "gold": "fact",
    "verdict": "14 years",
    "factMatch": "\\b14\\b|fourteen",
    "facts": [
      "Kaikeyi commanded that Rama must reside in the Dandaka forest as an ascetic hermit for fourteen years.",
      "Both pipelines should ground this explicit number from Book II."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 Golden Deer Demon Name",
    "question": "Which demon disguised himself as the golden deer with silver spots to deceive Sita?",
    "gold": "fact",
    "verdict": "Maricha",
    "factMatch": "\\bmaricha\\b|m\u0101r\u012bca|marich",
    "facts": [
      "Maricha took the form of a wondrous golden deer with silver spots to lure Rama away from the Panchavati hermitage."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 Number of Dasharatha's Sons",
    "question": "How many divine sons were born to King Dasharatha following the Putrakameshti sacrifice?",
    "gold": "fact",
    "verdict": "4 sons",
    "factMatch": "\\b4\\b|four",
    "facts": [
      "Four sons were born: Rama to Kausalya, Bharata to Kaikeyi, and the twins Lakshmana and Shatrughna to Sumitra."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 Sage Who Led Rama to Siddhashrama",
    "question": "Which revered sage came to Ayodhya and took young Rama and Lakshmana to protect his sacrifice from demons?",
    "gold": "fact",
    "verdict": "Vishvamitra",
    "factMatch": "\\bvishvamitra\\b|vi\u015bv\u0101mitra|viswamitra",
    "facts": [
      "Sage Vishvamitra arrived at Dasharatha's court to request Rama's assistance in destroying Tataka, Subahu, and Maricha."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 Demon Army Size at Janasthana",
    "question": "How many rakshasa warriors were in the army led by Khara and Dushana that Rama defeated single-handedly at Janasthana?",
    "gold": "fact",
    "verdict": "14,000 warriors",
    "factMatch": "\\b14,?000\\b|fourteen thousand",
    "facts": [
      "Khara mobilized an army of fourteen thousand (14,000) demon warriors, all of whom were destroyed by Rama."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 Name of King of Nishadas",
    "question": "What was the name of the devoted tribal chieftain and Nishada king who helped Rama cross the Ganga?",
    "gold": "fact",
    "verdict": "Guha",
    "factMatch": "\\bguha\\b",
    "facts": [
      "King Guha welcomed Rama at Sringaverapura with love and ferried the exile party across the Ganga in a boat."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 City of King Janaka",
    "question": "What was the capital city of King Janaka where Rama broke Lord Shiva's bow and married Sita?",
    "gold": "fact",
    "verdict": "Mithila",
    "factMatch": "\\bmithila\\b|janakpur",
    "facts": [
      "The capital of the Videha kingdom where the bow tournament and royal weddings took place was Mithila."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 River Flowing Past Ayodhya",
    "question": "What is the name of the sacred river that flows past the ancient city of Ayodhya?",
    "gold": "fact",
    "verdict": "Sarayu",
    "factMatch": "\\bsarayu\\b|sarju",
    "facts": [
      "The river flowing beside the capital city of Ayodhya is the holy Sarayu River."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 Vulture King Who Fought Ravana",
    "question": "Which noble vulture king fought Ravana in the sky and sacrificed his life attempting to rescue Sita?",
    "gold": "fact",
    "verdict": "Jatayu",
    "factMatch": "\\bjatayu\\b|ja\u1e6d\u0101yu",
    "facts": [
      "The vulture king Jatayu attacked Ravana's chariot in the air and died after informing Rama of Sita's abduction direction."
    ]
  },
  {
    "category": "Factual Precision",
    "label": "Factual \u00b7 Mountain Where Sugriva Lived",
    "question": "On which mountain peak were the exiled monkey king Sugriva and his counselors residing when Rama approached?",
    "gold": "fact",
    "verdict": "Rishyamukha",
    "factMatch": "\\brishyamukha\\b|\u1e5b\u1e63yam\u016bkha|rsyamukha",
    "facts": [
      "Sugriva and his minister Hanuman were living in exile on Mount Rishyamukha near Lake Pampa."
    ]
  }
];
