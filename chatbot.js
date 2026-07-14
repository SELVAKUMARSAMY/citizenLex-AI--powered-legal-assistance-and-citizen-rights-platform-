// Knowledge base for matching user queries to responses
const legalKnowledgeBase = [
    {
        keywords: ["police", "car", "search", "stopped", "vehicle", "traffic", "cop", "cops"],
        title: "Vehicle Search Rights",
        reply: `If you are stopped by the police in your vehicle, here is what you need to know about your rights regarding searches:

1. **Consent is Key**: Police officers cannot search your vehicle's cabin or trunk without **probable cause** or your **consent**. If an officer asks to search your car, you can politely but clearly say: *“Officer, I do not consent to a search.”*
2. **Plain View Doctrine**: If the officer sees illegal items (contraband, open containers) in plain view through the windows, they have probable cause. This allows them to search without your consent.
3. **Frisking/Safety Check**: An officer can pat down your outer clothing if they reasonably suspect you are armed and dangerous, but this doesn't automatically extend to searching your entire car.
4. **Detention vs Arrest**: You can ask: *“Officer, am I free to go, or am I being detained?”* If you are not being detained, you have the right to drive away calmly.

*Remember: Staying calm, keeping your hands visible, and expressing your rights verbally without physical resistance is the safest and most legally sound approach.*`,
        citations: ["Section 47, Code of Criminal Procedure (CrPC)", "Article 21, Constitution of India"]
    },
    {
        keywords: ["landlord", "tenant", "evict", "rent", "agreement", "lease", "room", "deposit", "eviction"],
        title: "Tenant Protection Rights",
        reply: `In tenancy disputes, the law provides strong protections against arbitrary actions by landlords:

1. **Due Process Required**: A landlord cannot evict you without following the due process of law. They must issue a formal written notice (typically 15-30 days prior) detailing the breach (non-payment, damage, etc.).
2. **No Forced Lockouts**: Self-help measures such as changing the door locks, cutting off water/electricity, or throwing out personal belongings are strictly **illegal**. If a landlord does this, you can file an immediate complaint with the Rent Controller or local magistrate.
3. **Rent Control Protections**: In many states, Rent Control Acts limit the amount of rent increases and safeguard tenants against arbitrary eviction if they continue to pay the agreed rent.
4. **Security Deposit Refund**: Your landlord is contractually obligated to refund your security deposit at the end of the tenancy, subject only to deductions for actual damage beyond normal wear and tear.

*If you receive a notice, consult a lawyer to file a formal reply. Always maintain records of all rent payments.*`,
        citations: ["Transfer of Property Act, Section 106", "State Rent Control Acts"]
    },
    {
        keywords: ["refund", "defect", "warranty", "consumer", "complaint", "store", "product", "defective", "return", "shop", "item"],
        title: "Consumer Rights & Defective Goods",
        reply: `As a consumer, you are protected against defective products and unfair trade practices:

1. **Right to Remedy**: The printing of 'No Exchange/No Refund' on a bill is often legally unenforceable if the product sold is defective, counterfeit, or unfit for its intended purpose.
2. **Manufacturer Liability**: Both the manufacturer and the retailer share liability for defective goods. You have the right to demand:
   - **Repair** of the product at no cost.
   - **Replacement** with a new, functional unit.
   - **Full Refund** of the purchase price if the defect is severe.
3. **Escalation Path**: If the store refuses to resolve the issue:
   - File an official complaint online on the **National Consumer Helpline (NCH)**.
   - Send a formal legal notice (which you can generate in our *Document Generator* tab).
   - File a case in the Consumer Commission (no lawyer is strictly required; you can represent yourself).

*Always preserve the original bill, invoice, and warranty cards.*`,
        citations: ["Consumer Protection Act, 2019", "Sale of Goods Act"]
    },
    {
        keywords: ["arrest", "police station", "arrested", "detained", "custody", "handcuff", "rights", "lockup"],
        title: "Rights Upon Arrest",
        reply: `If you or someone you know is arrested by law enforcement, you possess critical constitutional rights that must be respected:

1. **Right to Know Grounds**: You must be informed immediately of the exact offence and grounds for your arrest.
2. **Right to Legal Counsel**: You have the right to consult a defense lawyer of your choice. You can request the police to halt questioning until your lawyer arrives.
3. **24-Hour Production Limit**: The police must present you before a Judicial Magistrate within **24 hours** of arrest (excluding travel time). Any detention beyond this without a magistrate's order is illegal.
4. **Right to Silence**: You have a constitutional right against self-incrimination. You do not have to answer questions that incriminate you. What you say to police officers in custody is generally not admissible in court.
5. **Medical Examination**: You have the right to request a medical exam to document your physical condition at the time of arrest, which serves as protection against custodial violence.`,
        citations: ["Article 22, Constitution of India", "Section 50, 56, 57, Code of Criminal Procedure (CrPC)"]
    },
    {
        keywords: ["overtime", "work", "hours", "salary", "wages", "boss", "job", "contract", "fired", "layoff", "employee"],
        title: "Employee Working Hours & Overtime Rights",
        reply: `Labour laws regulate working conditions, standard working hours, and termination rules:

1. **Standard Working Hours**: The standard work duration is typically 8 to 9 hours a day (maximum 48 hours a week). 
2. **Double Pay for Overtime**: Any work beyond these hours is classified as overtime. Employers are legally required to compensate overtime work at **double** the normal rate of wages.
3. **Termination Notice**: For permanent employees, arbitrary firing is illegal. Employers must provide a notice period (typically 30 to 90 days) or salary in lieu of notice, along with severance benefits if qualified.
4. **Forced Waiver**: An employer cannot force you to sign a contract that waives your statutory labour rights. Any such clause is null and void under the law.

*Ensure you document your daily logs, emails requesting extra hours, and pay slips.*`,
        citations: ["Factories Act, Section 59", "State Shops and Establishments Acts"]
    },
    {
        keywords: ["emergency", "hospital", "accident", "medical", "treatment", "doctor", "ambulance", "payment"],
        title: "Emergency Medical Treatment Rights",
        reply: `In medical emergencies, lives are protected by supreme law over administrative procedures:

1. **Immediate Stabilization**: Any public or private hospital is legally bound to provide immediate, life-saving medical stabilization to emergency patients (like road accident victims or trauma cases).
2. **No Delay for Advance Pay**: A hospital cannot refuse or delay treatment due to lack of upfront payment, insurance details, or registration fees.
3. **No Police Clearances Delay**: The Supreme Court has ruled that saving a life is paramount. Treatment of emergency victims cannot be delayed for police clearances or 'Medico-Legal Case (MLC)' formalities.
4. **Good Samaritan Protection**: If you help an accident victim and bring them to a hospital, you cannot be forced to pay fees, disclose your identity, or be dragged into police investigations.

*Hospitals violating these directives face severe penalties and license cancellation.*`,
        citations: ["Article 21 (Right to Life)", "Supreme Court of India (Parmanand Katara vs. Union of India)"]
    },
    {
        keywords: ["woman", "women", "sunset", "sunrise", "arrest woman", "female", "girl"],
        title: "Arrest Rules for Women",
        reply: `The law recognizes special safeguards and protections for women during criminal investigations and arrests:

1. **Restricted Hours**: No woman can be arrested after sunset (6 PM) and before sunrise (6 AM).
2. **Judicial Exception**: If an arrest during these night hours is absolutely critical, the police must obtain written permission from a Judicial Magistrate First Class in advance.
3. **Female Officer Mandatory**: A woman can only be arrested and searched by a **female police officer**. Male officers are prohibited from physically touching a female suspect during an arrest.
4. **Safe Custody**: While in custody, women must be kept in separate women's lockups/wards to ensure their privacy and safety.

*If police officers violate these rules, it constitutes a serious procedural lapse, and the arrest can be challenged as unlawful.*`,
        citations: ["Section 46(4), Code of Criminal Procedure (CrPC)"]
    }
];

// Helper to convert Markdown-like syntax into HTML tags
function parseMarkdown(text) {
    let html = text;
    // Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic with asterisks: *text* -> <em>text</em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Bullet points: \n1. or \n-
    html = html.replace(/\n\d+\.\s+(.*?)(?=\n\d+\.|\n\*|\n\n|$)/g, '<li style="margin-left: 1.5rem; margin-bottom: 0.5rem;">$1</li>');
    html = html.replace(/\n-\s+(.*?)(?=\n-|\n\*|\n\n|$)/g, '<li style="margin-left: 1.5rem; margin-bottom: 0.5rem;">$1</li>');
    
    // Group consecutive list items into ul/ol
    html = html.replace(/(<li.*?>.*?<\/li>)+/g, '<ul style="margin: 0.75rem 0;">$&</ul>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '<p style="margin-bottom: 0.75rem;"></p>');
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Main logic to retrieve matching answer
function getAIResponse(query) {
    const cleanedQuery = query.toLowerCase().trim();
    
    // Search knowledge base
    for (const entry of legalKnowledgeBase) {
        for (const kw of entry.keywords) {
            if (cleanedQuery.includes(kw)) {
                return {
                    reply: parseMarkdown(entry.reply),
                    citations: entry.citations,
                    title: entry.title
                };
            }
        }
    }
    
    // Fallback response if no keywords match
    const fallbackText = `Hello! I am your CitizenLex AI Legal Assistant. 

I can guide you on common legal matters, including:
- **Tenant Rights** (eviction, rental agreements, utility cutoffs)
- **Consumer Protection** (refunds, defective goods, store returns)
- **Police Interactions** (car searches, arrest rights, detention)
- **Employee Rights** (working hours, overtime salary, dismissal)
- **Emergency Medical Care** (hospital treatment refusal rules)
- **Women's Rights** (arrest rules, timing restrictions)

Please tell me more about your situation. For example, you can ask: *“Can a landlord lock me out?”* or *“What are my rights if police stop my car?”*`;

    return {
        reply: parseMarkdown(fallbackText),
        citations: ["Constitution of India", "Consumer Protection Act", "Criminal Procedure Code"],
        title: "General Assistance"
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getAIResponse, parseMarkdown };
}
