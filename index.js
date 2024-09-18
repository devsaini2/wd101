let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else{
        entries = [];
    }
    return entries;
}
let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class ='border px-4 py-2'>${entry.name}</td>`
        const emailCell = `<td class ='border px-4 py-2'>${entry.email}</td>`
        const passwordCell = `<td class ='border px-4 py-2'>${entry.password}</td>`
        const dobCell = `<td class ='border px-4 py-2'>${entry.dob}</td>`
        const acceptTermsCell = `<td class ='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`
        return row;
    }).join("\n");

     const table = `<table class="table-auto w-full"><tr>
    
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">dob</th>
    <th class="px-4 py-2">accepted terms?</th>
</tr>${tableEntries} </table>`;

let details = document.getElementById("user-entries");
details.innerHTML = table;
}
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptedTermsAndconditions = document.getElementById("terms").checked;
    // This below code Varify the age range using the date of birth
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var i = today.getMonth() - birthDate.getMonth();
    if (i < 0 || (i === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55");
        return false;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();

}
userForm.addEventListener("submit",saveUserForm);
displayEntries();
