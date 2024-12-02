const gstRate = 0.18;
const addItemButton = document.getElementById("addItemButton");
const itemsTableBody = document.getElementById("itemsTableBody");
const billTableBody = document.getElementById("billTableBody");
const grandTotalSpan = document.getElementById("grandTotal");
const printBillItem = document.getElementById("printBillItem");
const customerDetail = document.getElementById("customerDetail");
const customerDetailEmail = document.getElementById("customerDetailEmail");
const customerPhoneNumber = document.getElementById("customerPhoneNumber");
const customerAttendDate = document.getElementById("customerAttendDate");
const customerBillDetail = document.getElementById("customerBillDetail");
const printSpan = document.getElementById("printSpan");
const grossServiceTax = document.getElementById("grossServiceTax");
const resetBillItem = document.getElementById("resetBillItem");
const resetBillPrintItem = document.getElementById("resetBillPrintItem");
const myFar = document.getElementById("myFar");
let grandTotal = 0;

addItemButton.addEventListener("click", function () {
  const itemName = document.getElementById("itemName").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  const companyDetails = [];
  companyDetails.push({ itemName, price, quantity, customerDetail, customerDetailEmail, customerPhoneNumber, customerAttendDate, customerBillDetail })
  console.log('companyDetails', companyDetails);
  if (itemName && price > 0 && quantity > 0) {
    const gst = price * gstRate;
    const total = (price + gst) * quantity;
    const row = document.createElement("tr");
    row.classList.add("border-b", "dark:border-gray-700", "text-md");
    row.innerHTML = `
      <td class="px-6 py-3">${itemName}</td>
      <td class="px-6 py-3">₹ ${price.toFixed(2)}</td>
      <td class="px-6 py-3">${quantity}</td>
      <td class="px-6 py-3">₹ ${gst.toFixed(2)}</td>
      <td class="px-6 py-3">₹ ${total.toFixed(2)}</td>
    `;
    itemsTableBody.appendChild(row);
    grandTotal += total;
    grandTotalSpan.textContent = `Grand Total : ₹ ${grandTotal.toFixed(2)}`;
    document.getElementById("itemName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
  } else {
    alert("Please enter valid item details.");
  }
});

printBillItem.addEventListener("click", function () {
  const customerName = document.getElementById("customerName").value;
  const customerEmail = document.getElementById("customerEmail").value;
  const customerPhone = document.getElementById("customerPhone").value;
  const PurchaseDate = document.getElementById("PurchaseDate").value;
  const customerBillNumber = document.getElementById("customerBillNumber").value;
  customerDetail.textContent = `Customer Name: ${customerName}`;
  customerDetailEmail.textContent = `Customer Email: ${customerEmail}`;
  customerPhoneNumber.textContent = `Customer Phone Number: ${customerPhone}`;
  customerAttendDate.textContent = `Date: ${PurchaseDate}`;
  customerBillDetail.textContent = `Bill No: ${customerBillNumber}`;
  // Get the table rows (excluding header, assuming the table rows are inside 'itemsTableBody')
  const rows = itemsTableBody.querySelectorAll('tr');
  // Initialize a variable to store item details
  let billItemsDetails = '';
  // Loop through each row to get the item details
  rows.forEach(row => {
    const columns = row.querySelectorAll('td');
    // Extract item data from the columns (assuming the table has columns in this order: Item, Price, Quantity, GST, Total)
    const itemName = columns[0].textContent.trim();
    const price = parseFloat(columns[1].textContent.replace('₹', '').trim());
    const quantity = parseInt(columns[2].textContent.trim());
    const gst = parseFloat(columns[3].textContent.replace('₹', '').trim());
    const total = parseFloat(columns[4].textContent.replace('₹', '').trim());
    // Add this item details to the bill items string
    billItemsDetails += `
      <tr>
        <td class="px-6 py-3">${itemName}</td>
        <td class="px-6 py-3">₹ ${price.toFixed(2)}</td>
        <td class="px-6 py-3">${quantity}</td>
        <td class="px-6 py-3">₹ ${gst.toFixed(2)}</td>
        <td class="px-6 py-3">₹ ${total.toFixed(2)}</td>
      </tr>
    `;
  });
  billTableBody.innerHTML = billItemsDetails;
  const Gst = grandTotal * gstRate;
  grossServiceTax.textContent = `₹ ${Gst.toFixed(2)}`;
  printSpan.textContent = `₹ ${grandTotal.toFixed(2)}`;
  document.getElementById("customerName").value = "";
  document.getElementById("customerEmail").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("PurchaseDate").value = "";
  document.getElementById("customerBillNumber").value = "";
  itemsTableBody.innerHTML = '';
  grandTotal = 0;
  grandTotalSpan.textContent = `Grand Total : ₹ 0.00`;
  document.getElementById("itemName").focus();
});


resetBillItem.addEventListener("click", function () {
  document.getElementById("myForm").reset();
  itemsTableBody.innerHTML = '';
  grandTotal = 0;
  grandTotalSpan.textContent = `Grand Total : ₹ 0.00`;
});

resetBillPrintItem.addEventListener("click", function () {

  document.getElementById("myFar").reset();
  billTableBody.innerHTML = '';
  customerDetail.textContent = 'Customer Name:';
  customerDetailEmail.textContent = 'Customer Email:';
  customerPhoneNumber.textContent = 'Customer Phone Number:';
  customerAttendDate.textContent = 'Date:';
  customerBillDetail.textContent = 'Bill No:';
  printSpan.textContent = 'Total:';
  grossServiceTax.textContent = 'GST:';

  myFar.style.display = 'none';
});

function dropDown() {
  if (myFar.style.display === 'none' || myFar.style.display === '') {
    myFar.style.display = 'block';
  } else {
    myFar.style.display = 'none';
  }
};
document.getElementById("printBillItem").addEventListener("click", dropDown);
