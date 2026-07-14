const glossaryData = [
    {
        term: "Affidavit",
        latin: "Affidare (To pledge faith)",
        definition: "A written statement of facts voluntarily made by an affiant under an oath or affirmation administered by a person authorized by law (like a Notary Public or Oath Commissioner).",
        example: "When applying for a name change, you are typically required to submit an affidavit affirming your identity."
    },
    {
        term: "Amicus Curiae",
        latin: "Friend of the Court",
        definition: "An independent professional advisor (often an experienced attorney or scholar) who is not a party to the lawsuit but is invited by the court to assist by offering information, expertise, or insight.",
        example: "The Supreme Court appointed an amicus curiae to provide an unbiased analysis of the environmental impact of the industrial project."
    },
    {
        term: "Bail",
        latin: "Baiulare (To bear a burden)",
        definition: "The temporary release of an accused person awaiting trial, conditional upon a security bond or monetary deposit to ensure their appearance in court when summoned.",
        example: "The magistrate granted bail to the defendant under the condition that they surrender their passport."
    },
    {
        term: "Caveat Emptor",
        latin: "Let the buyer beware",
        definition: "A commercial law principle stating that the buyer alone is responsible for assessing the quality and suitability of goods before completing a purchase, unless a warranty is explicitly provided.",
        example: "Real estate purchases are often guided by caveat emptor; the buyer must inspect the property for hidden defects before closing."
    },
    {
        term: "De Facto",
        latin: "In fact / In reality",
        definition: "Practices that exist in reality, regardless of whether they are officially or legally recognized by law (contrasted with 'De Jure').",
        example: "Although another manager was appointed on paper, she remained the de facto leader of the department."
    },
    {
        term: "De Jure",
        latin: "By law / Rightful entitlement",
        definition: "A state of affairs that is officially recognized and mandated by law, whether or not it exists in practice.",
        example: "Following the democratic election, the prime minister became the de jure head of government."
    },
    {
        term: "Ex Parte",
        latin: "From one party",
        definition: "A legal proceeding, order, or hearing granted for the benefit of one party only, without notice to or presence of the opposing party (often in emergencies).",
        example: "The judge issued an ex parte temporary restraining order to prevent the developer from cutting down the trees before the full hearing."
    },
    {
        term: "Habeas Corpus",
        latin: "You shall have the body",
        definition: "A constitutional writ that protects individuals against unlawful and arbitrary detention. It commands authorities holding a detainee to produce them before a court to justify the legality of their imprisonment.",
        example: "The lawyer filed a writ of habeas corpus to release the activist who was held without charges for three days."
    },
    {
        term: "Injunction",
        latin: "Injungere (To enjoin / command)",
        definition: "A judicial order that restrains a person or entity from beginning or continuing an action threatening or invading the legal right of another, or compels them to carry out a specific act.",
        example: "The court granted an injunction prohibiting the factory from dumping chemicals into the river."
    },
    {
        term: "Locus Standi",
        latin: "Place of standing",
        definition: "The right or capacity of a party to bring a lawsuit or appear before a court, based on showing a sufficient connection to and harm from the action challenged.",
        example: "Because he did not live in the district and suffered no personal injury, the judge ruled he lacked locus standi to contest the local zoning rule."
    },
    {
        term: "Mens Rea",
        latin: "Guilty mind",
        definition: "The mental element of a crimeâthe intention, knowledge, or recklessness of wrongdoingâwhich must be proven alongside the physical act (actus reus) to establish criminal liability.",
        example: "Accidentally taking someone's umbrella is not theft because there was no mens rea to steal."
    },
    {
        term: "Nolo Contendere",
        latin: "I do not wish to contend",
        definition: "A plea in a criminal case where the defendant accepts conviction as if they pleaded guilty, but does not explicitly admit guilt, preventing the plea from being used as an admission in civil lawsuits.",
        example: "The executive pleaded nolo contendere to the antitrust charges, avoiding a public admission of guilt."
    },
    {
        term: "Power of Attorney",
        latin: "Procuratio",
        definition: "A legal document delegating authority to an agent (attorney-in-fact) to act on behalf of the principal in financial, legal, business, or medical affairs.",
        example: "He granted power of attorney to his daughter so she could manage his banking while he was recovering in the hospital."
    },
    {
        term: "Quo Warranto",
        latin: "By what warrant?",
        definition: "A legal proceeding or writ calling upon a person to show by what authority they claim or exercise a public office, franchise, or liberty.",
        example: "The opposition filed a quo warranto petition to challenge the appointment of the unqualified board member."
    },
    {
        term: "Res Judicata",
        latin: "A matter judged",
        definition: "A legal rule preventing a dispute that has already been final-judged on its merits by a competent court from being relitigated by the same parties.",
        example: "The court dismissed the new lawsuit on grounds of res judicata, as the ownership issue was settled in a 2021 trial."
    },
    {
        term: "Subpoena",
        latin: "Under penalty",
        definition: "A formal written order issued by a court commanding a witness to appear and testify, or to produce specific documents under penalty for failure to comply.",
        example: "The accountant received a subpoena duces tecum ordering him to bring all tax ledgers for the audits."
    },
    {
        term: "Tort",
        latin: "Torquere (To twist / wrong)",
        definition: "A civil (non-criminal) wrong, other than a breach of contract, that causes injury or harm to another, resulting in civil liability for which courts award monetary damages.",
        example: "Negligence leading to a slip-and-fall accident on a wet supermarket floor is a classic example of a tort."
    },
    {
        term: "Ultra Vires",
        latin: "Beyond the powers",
        definition: "An action taken by a corporation, public body, or official that exceeds the scope of legal power granted to them by charter, statute, or constitution.",
        example: "The municipality's decision to ban all commercial vehicles was declared ultra vires because state law only allowed them to regulate, not ban."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { glossaryData };
}
