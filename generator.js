const documentTemplates = {
    "lease-termination": {
        title: "Lease Termination Notice",
        description: "Formally notify your landlord that you are ending your lease agreement and requesting your security deposit refund.",
        fields: [
            { id: "senderName", label: "Your Full Name", type: "text", placeholder: "John Doe" },
            { id: "senderAddress", label: "Your Current Address", type: "text", placeholder: "Apartment 4B, Blue Sky Apts, Bangalore" },
            { id: "recipientName", label: "Landlord Name", type: "text", placeholder: "Jane Smith" },
            { id: "recipientAddress", label: "Landlord Address", type: "text", placeholder: "12 Gold Medal Road, Bangalore" },
            { id: "agreementDate", label: "Lease Agreement Date", type: "date", placeholder: "" },
            { id: "terminationDate", label: "Move-Out Date", type: "date", placeholder: "" },
            { id: "depositAmount", label: "Security Deposit Amount ($)", type: "number", placeholder: "1500" }
        ],
        compile: function(data) {
            const dateStr = data.date ? formatDate(data.date) : formatDate(new Date());
            const agreementDateStr = data.agreementDate ? formatDate(data.agreementDate) : "[Agreement Date]";
            const terminationDateStr = data.terminationDate ? formatDate(data.terminationDate) : "[Move-Out Date]";
            const deposit = data.depositAmount ? parseFloat(data.depositAmount).toLocaleString() : "[Deposit Amount]";
            
            return `
<div class="legal-letter-header">
    <strong>Sender:</strong><br>
    ${data.senderName || "[Your Name]"}<br>
    ${data.senderAddress || "[Your Address]"}<br><br>
    <strong>Date:</strong> ${dateStr}
</div>

<div class="legal-letter-recipient">
    <strong>To:</strong><br>
    ${data.recipientName || "[Landlord Name]"}<br>
    ${data.recipientAddress || "[Landlord Address]"}<br>
</div>

<div class="legal-letter-subject">
    SUBJECT: NOTICE OF LEASE TERMINATION AND REQUEST FOR SECURITY DEPOSIT REFUND
</div>

<div class="legal-letter-body">
    <p>Dear ${data.recipientName || "Landlord/Landlady"},</p>
    
    <p>Please accept this letter as formal notification that I am terminating my tenancy at the address listed above. In accordance with the lease agreement dated <strong>${agreementDateStr}</strong>, I am providing written notice of my intention to vacate the premises on or before <strong>${terminationDateStr}</strong>.</p>
    
    <p>I request that my security deposit of <strong>$${deposit}</strong>, which was paid to you at the commencement of the tenancy, be refunded in full. As per local tenancy regulations, the security deposit must be returned within the statutory timeframe, minus any legally permissible deductions which must be accompanied by an itemized list of damages.</p>
    
    <p>Prior to my departure, I would like to schedule a joint move-out inspection to review the condition of the premises. Please contact me at your earliest convenience to arrange a suitable time. I will leave the premises in a clean and undamaged state, normal wear and tear excepted.</p>
    
    <p>Please forward the security deposit refund and any correspondence to my forwarding address listed below or via electronic bank transfer.</p>
    
    <p>Thank you for your cooperation during my tenancy.</p>
</div>

<div class="legal-letter-signature">
    Sincerely,<br><br><br>
    ___________________________<br>
    <strong>${data.senderName || "[Your Name]"}</strong><br>
    Forwarding Address: ${data.senderAddress || "[Your Address]"}
</div>
            `;
        }
    },
    
    "consumer-complaint": {
        title: "Defective Product Grievance Notice",
        description: "Issue a formal demand to a business/retailer to repair, replace, or refund a defective product before initiating consumer court proceedings.",
        fields: [
            { id: "senderName", label: "Your Full Name", type: "text", placeholder: "Jane Doe" },
            { id: "senderAddress", label: "Your Address", type: "text", placeholder: "56 Sector-C, Delhi" },
            { id: "recipientName", label: "Business/Manager Name", type: "text", placeholder: "Manager, ElectroCorp Retail" },
            { id: "recipientAddress", label: "Business Address", type: "text", placeholder: "99 Tech Park Street, Delhi" },
            { id: "productName", label: "Product Name & Model", type: "text", placeholder: "ElectroCorp Pro Laptop (Model EC-500)" },
            { id: "purchaseDate", label: "Purchase Date", type: "date", placeholder: "" },
            { id: "invoiceNumber", label: "Invoice / Bill Number", type: "text", placeholder: "INV-2026-8902" },
            { id: "defectDescription", label: "Description of Defect", type: "textarea", placeholder: "The display screen flickers constantly and shuts down within 10 minutes of use." },
            { id: "remedySought", label: "Remedy Sought", type: "select", options: ["Full Refund", "Replacement", "Free Repair under Warranty"] }
        ],
        compile: function(data) {
            const dateStr = data.date ? formatDate(data.date) : formatDate(new Date());
            const purchaseDateStr = data.purchaseDate ? formatDate(data.purchaseDate) : "[Purchase Date]";
            
            return `
<div class="legal-letter-header">
    <strong>From:</strong><br>
    ${data.senderName || "[Your Name]"}<br>
    ${data.senderAddress || "[Your Address]"}<br><br>
    <strong>Date:</strong> ${dateStr}
</div>

<div class="legal-letter-recipient">
    <strong>To:</strong><br>
    ${data.recipientName || "[Business/Manager Name]"}<br>
    ${data.recipientAddress || "[Business Address]"}<br>
</div>

<div class="legal-letter-subject">
    SUBJECT: FORMAL NOTICE REGARDING DEFECTIVE GOOD: ${data.productName ? data.productName.toUpperCase() : "[PRODUCT NAME]"}
</div>

<div class="legal-letter-body">
    <p>Dear Sir/Madam,</p>
    
    <p>This is a formal notice regarding the purchase of <strong>${data.productName || "[Product Name]"}</strong> purchased from your establishment on <strong>${purchaseDateStr}</strong> under invoice number <strong>${data.invoiceNumber || "[Invoice Number]"}</strong>.</p>
    
    <p>I regret to inform you that the product purchased is defective and unfit for its merchantable purpose. Specifically, the product exhibits the following material defects: <em>${data.defectDescription || "[Describe the defects here]"}</em>. Despite adhering strictly to the user manual and operating instructions, the device remains non-functional.</p>
    
    <p>As per the Consumer Protection Act, I am entitled to goods of merchantable quality. Under the circumstances, I hereby demand a <strong>${data.remedySought || "Full Refund"}</strong> in accordance with statutory consumer protections.</p>
    
    <p>Please note that if this issue is not resolved to my satisfaction within fourteen (14) days from the receipt of this notice, I shall be compelled to escalate this matter to the Consumer Commission / Consumer Forum for legal redress, including claims for damages, mental harassment, and legal costs. Let this letter serve as a mandatory statutory notice before legal actions.</p>
    
    <p>I look forward to your prompt response to amicably resolve this matter.</p>
</div>

<div class="legal-letter-signature">
    Sincerely,<br><br><br>
    ___________________________<br>
    <strong>${data.senderName || "[Your Name]"}</strong><br>
    Contact No / Email: _______________________
</div>
            `;
        }
    },
    
    "rti-request": {
        title: "Right to Information (RTI) Application",
        description: "Draft a formal application to seek public information from government departments under the Right to Information Act.",
        fields: [
            { id: "senderName", label: "Your Full Name", type: "text", placeholder: "Samuel K." },
            { id: "senderAddress", label: "Your Address", type: "text", placeholder: "House 24, Civil Lines, Mumbai" },
            { id: "recipientName", label: "Public Information Officer (PIO)", type: "text", placeholder: "Public Information Officer, Municipal Corporation" },
            { id: "recipientAddress", label: "Department Address", type: "text", placeholder: "Ward 3 Office, Municipal Building, Mumbai" },
            { id: "subjectDepartment", label: "Subject / Matter of Inquiry", type: "text", placeholder: "Road maintenance and repair funds for Ward 3" },
            { id: "informationRequired", label: "Specific Questions / Information Requested", type: "textarea", placeholder: "1. Provide details of the total budget allocated for road repairs in Ward 3 during the financial year 2025-2026.\n2. Provide copies of completion certificates issued to contractors." },
            { id: "feeDetails", label: "Application Fee Details", type: "text", placeholder: "Postal Order No. 45G67890 for Rs. 10/-" }
        ],
        compile: function(data) {
            const dateStr = data.date ? formatDate(data.date) : formatDate(new Date());
            
            return `
<div class="legal-letter-header">
    <strong>From:</strong><br>
    ${data.senderName || "[Your Name]"}<br>
    ${data.senderAddress || "[Your Address]"}<br><br>
    <strong>Date:</strong> ${dateStr}
</div>

<div class="legal-letter-recipient">
    <strong>To:</strong><br>
    The Public Information Officer (PIO)<br>
    ${data.recipientName || "[PIO Office Name]"}<br>
    ${data.recipientAddress || "[PIO Office Address]"}<br>
</div>

<div class="legal-letter-subject">
    SUBJECT: APPLICATION FOR SEEKING INFORMATION UNDER THE RIGHT TO INFORMATION ACT, 2005
</div>

<div class="legal-letter-body">
    <p>Dear Officer,</p>
    
    <p>I, the undersigned, hereby request the following information under the provisions of the Right to Information Act, 2005, concerning <strong>${data.subjectDepartment || "[Subject Matter]"}</strong>.</p>
    
    <p><strong>Particulars of Information Required:</strong></p>
    <div style="margin-left: 1.5rem; margin-bottom: 1.5rem; font-family: monospace; white-space: pre-wrap;">${data.informationRequired || "[Enter your questions here]"}</div>
    
    <p>I state that the information requested does not fall within the exemptions contained in Section 8 or 9 of the RTI Act, 2005, and is related to public interest and activities of the department.</p>
    
    <p>I am a citizen of India. I have attached the prescribed application fee of Rs. 10/- via: <strong>${data.feeDetails || "[e.g., Postal Order / Demand Draft details]"}</strong>.</p>
    
    <p>If the requested information or any part thereof is held by another public authority, please transfer this application or such part of it as may be appropriate under Section 6(3) of the Act within five days, and inform me immediately of the transfer.</p>
</div>

<div class="legal-letter-signature">
    Sincerely,<br><br><br>
    ___________________________<br>
    <strong>${data.senderName || "[Your Name]"}</strong><br>
    Applicant Signature
</div>
            `;
        }
    }
};

// Helper function to format date nicely
function formatDate(dateVal) {
    if (!dateVal) return "";
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) return dateVal;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
