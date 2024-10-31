// Get the form
const form = document.getElementById("form");

// Define the inputs
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postcodeInput = document.getElementById("postcode");
const passwordFirstInput = document.getElementById("password_first");
const passwordSecondInput = document.getElementById("password_second");

// Define the error boxes:
const emailError = document.getElementById("email_error");
const countryError = document.getElementById("country_error");
const postcodeError = document.getElementById("postcode_error");
const passwordFirstError = document.getElementById("password_first_error");
const passwordSecondError = document.getElementById("password_second_error");

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

// Function for checking a field and showing errors:
function validateField(field, errorElement) {
  // Reset custom validity and clear error if the field is valid
  field.setCustomValidity("");
  if (field.validity.valid) {
    errorElement.textContent = "";
    errorElement.classList.remove("active");
  } else {
    showError(field, errorElement);
  }

  // Additional email validation
  if (field === emailInput && !emailPattern.test(field.value)) {
    field.setCustomValidity("Invalid email format.");
    errorElement.textContent = "Please enter a valid email address.";
    errorElement.classList.add("active");
  }

  // Additional password validation
  if (field === passwordFirstInput && !passwordPattern.test(field.value)) {
    field.setCustomValidity("Invalid password format.");
    errorElement.textContent =
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and one of these special characters: !@#$%^&*.";
    errorElement.classList.add("active");
  }

  // Check password match for confirmation
  if (field === passwordSecondInput) {
    if (passwordFirstInput.value !== passwordSecondInput.value) {
      field.setCustomValidity("Passwords do not match.");
      passwordSecondError.textContent = "Passwords do not match!";
      passwordSecondError.classList.add("active");
    } else {
      field.setCustomValidity("");
      passwordSecondError.textContent = "";
      passwordSecondError.classList.remove("active");
    }
  }
}

// function to show an error:
function showError(field, errorElement) {
  if (field.validity.valueMissing) {
    errorElement.textContent = "This is a required field.";
  } else if (field.validity.typeMismatch) {
    errorElement.textContent = "Please enter a valid email address.";
  } else if (field.validity.tooShort) {
    errorElement.textContent = `Please enter at least ${field.minLength} characters.`;
  } else if (field.validity.patternMismatch) {
    if (field === passwordFirstInput) {
      errorElement.textContent =
        "Password must be 8+ characters, including an uppercase letter, a lowercase letter, a number, and a special character.";
    } else {
      errorElement.textContent = "Please match the requested format.";
    }
  } else if (
    field === passwordSecondInput &&
    field.value !== passwordFirstInput.value
  ) {
    errorElement.textContent = "Password do not match! Please re-enter.";
  }
  errorElement.classList.add("active");
}

// Input listeners
emailInput.addEventListener("input", () => {
  validateField(emailInput, emailError);
});
countryInput.addEventListener("input", () => {
  validateField(countryInput, countryError);
});
postcodeInput.addEventListener("input", () => {
  validateField(postcodeInput, postcodeError);
});
passwordFirstInput.addEventListener("input", () => {
  validateField(passwordFirstInput, passwordFirstError);
});
passwordSecondInput.addEventListener("input", () => {
  validateField(passwordSecondInput, passwordSecondError);
});

// Event listener for form submit button

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  validateField(emailInput, emailError);
  validateField(countryInput, countryError);
  validateField(postcodeInput, postcodeError);
  validateField(passwordFirstInput, passwordFirstError);
  validateField(passwordSecondInput, passwordSecondError);

  if (
    !emailInput.validity.valid ||
    !countryInput.validity.valid ||
    !postcodeInput.validity.valid ||
    !passwordFirstInput.validity.valid ||
    !passwordSecondInput.validity.valid
  ) {
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
  }
});

// Populating the country selector:
const countries = {
  AF: "Afghanistan",
  AX: "Åland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, The Democratic Republic of The",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czechia",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea, Democratic People's Republic of",
  KR: "Korea, Republic of",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia, The Former Yugoslav Republic of",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States of",
  MD: "Moldova, Republic of",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  SH: "Saint Helena",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and The Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and The South Sandwich Islands",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan, Province of China",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Minor Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

// Create the default option and disable it:
const defaultCountryText = document.createElement("option");
defaultCountryText.textContent = "Click here to select your country:";
defaultCountryText.value = "";
defaultCountryText.disabled = true;
defaultCountryText.selected = true;
countryInput.appendChild(defaultCountryText);

// Add each one to the list:
Object.entries(countries).forEach(([code, name]) => {
  const option = document.createElement("option");
  option.value = code;
  option.textContent = name;
  countryInput.appendChild(option);
});

// Define the postcode patterns:
const postcodePatterns = {
  GB: "GIR\\s?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\\d[\\dA-Z]?\\s?\\d[ABD-HJLN-UW-Z]{2}))|BFPO\\s?\\d{1,4}",
  JE: "JE\\d[\\dA-Z]?\\s?\\d[ABD-HJLN-UW-Z]{2}",
  GG: "GY\\d[\\dA-Z]?\\s?\\d[ABD-HJLN-UW-Z]{2}",
  IM: "IM\\d[\\dA-Z]?\\s?\\d[ABD-HJLN-UW-Z]{2}",
  US: "\\d{5}([ \\-]\\d{4})?",
  CA: "[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z]\\s?\\d[ABCEGHJ-NPRSTV-Z]\\d",
  DE: "\\d{5}",
  JP: "\\d{3}-\\d{4}",
  FR: "\\d{2}\\s?\\d{3}",
  AU: "\\d{4}",
  IT: "\\d{5}",
  CH: "\\d{4}",
  AT: "\\d{4}",
  ES: "\\d{5}",
  NL: "\\d{4}\\s?[A-Z]{2}",
  BE: "\\d{4}",
  DK: "\\d{4}",
  SE: "\\d{3}\\s?\\d{2}",
  NO: "\\d{4}",
  BR: "\\d{5}[-]?\\d{3}",
  PT: "\\d{4}([-]\\d{3})?",
  FI: "\\d{5}",
  AX: "22\\d{3}",
  KR: "\\d{3}[-]\\d{3}",
  CN: "\\d{6}",
  TW: "\\d{3}(\\d{2})?",
  SG: "\\d{6}",
  DZ: "\\d{5}",
  AD: "AD\\d{3}",
  AR: "([A-HJ-NP-Z])?\\d{4}([A-Z]{3})?",
  AM: "(37)?\\d{4}",
  AZ: "\\d{4}",
  BH: "((1[0-2]|[2-9])\\d{2})?",
  BD: "\\d{4}",
  BB: "(BB\\d{5})?",
  BY: "\\d{6}",
  BM: "[A-Z]{2}\\s?[A-Z0-9]{2}",
  BA: "\\d{5}",
  IO: "BBND 1ZZ",
  BN: "[A-Z]{2}\\s?\\d{4}",
  BG: "\\d{4}",
  KH: "\\d{5}",
  CV: "\\d{4}",
  CL: "\\d{7}",
  CR: "\\d{4,5}|\\d{3}-\\d{4}",
  HR: "\\d{5}",
  CY: "\\d{4}",
  CZ: "\\d{3}\\s?\\d{2}",
  DO: "\\d{5}",
  EC: "([A-Z]\\d{4}[A-Z]|(?:[A-Z]{2})?\\d{6})?",
  EG: "\\d{5}",
  EE: "\\d{5}",
  FO: "\\d{3}",
  GE: "\\d{4}",
  GR: "\\d{3}\\s?\\d{2}",
  GL: "39\\d{2}",
  GT: "\\d{5}",
  HT: "\\d{4}",
  HN: "(?:\\d{5})?",
  HU: "\\d{4}",
  IS: "\\d{3}",
  IN: "\\d{6}",
  ID: "\\d{5}",
  IL: "\\d{5}",
  JO: "\\d{5}",
  KZ: "\\d{6}",
  KE: "\\d{5}",
  KW: "\\d{5}",
  LA: "\\d{5}",
  LV: "\\d{4}",
  LB: "(\\d{4}(\\s?\\d{4})?)?",
  LI: "(948[5-9])|(949[0-7])",
  LT: "\\d{5}",
  LU: "\\d{4}",
  MK: "\\d{4}",
  MY: "\\d{5}",
  MV: "\\d{5}",
  MT: "[A-Z]{3}\\s?\\d{2,4}",
  MU: "(\\d{3}[A-Z]{2}\\d{3})?",
  MX: "\\d{5}",
  MD: "\\d{4}",
  MC: "980\\d{2}",
  MA: "\\d{5}",
  NP: "\\d{5}",
  NZ: "\\d{4}",
  NI: "((\\d{4}-)?\\d{3}-\\d{3}(-\\d{1})?)?",
  NG: "(\\d{6})?",
  OM: "(PC )?\\d{3}",
  PK: "\\d{5}",
  PY: "\\d{4}",
  PH: "\\d{4}",
  PL: "\\d{2}-\\d{3}",
  PR: "00[679]\\d{2}([ \\-]\\d{4})?",
  RO: "\\d{6}",
  RU: "\\d{6}",
  SM: "4789\\d",
  SA: "\\d{5}",
  SN: "\\d{5}",
  SK: "\\d{3}\\s?\\d{2}",
  SI: "\\d{4}",
  ZA: "\\d{4}",
  LK: "\\d{5}",
  TJ: "\\d{6}",
  TH: "\\d{5}",
  TN: "\\d{4}",
  TR: "\\d{5}",
  TM: "\\d{6}",
  UA: "\\d{5}",
  UY: "\\d{5}",
  UZ: "\\d{6}",
  VA: "00120",
  VE: "\\d{4}",
  ZM: "\\d{5}",
  AS: "96799",
  CC: "6799",
  CK: "\\d{4}",
  RS: "\\d{6}",
  ME: "8\\d{4}",
  CX: "6798",
  ET: "\\d{4}",
  FK: "FIQQ 1ZZ",
  NF: "2899",
  FM: "(9694[1-4])([ \\-]\\d{4})?",
  GF: "9[78]3\\d{2}",
  GN: "\\d{3}",
  GP: "9[78][01]\\d{2}",
  GS: "SIQQ 1ZZ",
  GU: "969[123]\\d([ \\-]\\d{4})?",
  GW: "\\d{4}",
  HM: "\\d{4}",
  IQ: "\\d{5}",
  KG: "\\d{6}",
  LR: "\\d{4}",
  LS: "\\d{3}",
  MG: "\\d{3}",
  MH: "969[67]\\d([ \\-]\\d{4})?",
  MN: "\\d{6}",
  MP: "9695[012]([ \\-]\\d{4})?",
  MQ: "9[78]2\\d{2}",
  NC: "988\\d{2}",
  NE: "\\d{4}",
  VI: "008(([0-4]\\d)|(5[01]))([ \\-]\\d{4})?",
  PF: "987\\d{2}",
  PG: "\\d{3}",
  PM: "9[78]5\\d{2}",
  PN: "PCRN 1ZZ",
  PW: "96940",
  RE: "9[78]4\\d{2}",
  SH: "(ASCN|STHL) 1ZZ",
  SJ: "\\d{4}",
  SO: "\\d{5}",
  SZ: "[HLMS]\\d{3}",
  TC: "TKCA 1ZZ",
  WF: "986\\d{2}",
  XK: "\\d{5}",
  YT: "976\\d{2}",
};

// Function to validate the postcodes:
function validatePostcode() {
  const selectedCountryCode = countryInput.value;
  const pattern = postcodePatterns[selectedCountryCode];

  if (pattern) {
    const regex = new RegExp(`^${pattern}$`);
    if (!regex.test(postcodeInput.value)) {
      postcodeError.textContent =
        "Invalid postcode format for the selected country.";
      postcodeError.classList.add("active");
    } else {
      postcodeError.textContent = "";
      postcodeError.classList.remove("active");
    }
  } else {
    postcodeError.textContent =
      "Country not supported for postcode validation.";
    postcodeError.classList.add("active");
  }
}

countryInput.addEventListener("change", validatePostcode);
postcodeInput.addEventListener("input", validatePostcode);
