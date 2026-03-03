// Test forgot password endpoint
const adminEmail = "faran.bsce40@iiu.edu.pk";

console.log("Testing forgot password endpoint...");
console.log("Sending email to:", adminEmail);

fetch("http://localhost:3004/api/auth/forgot-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: adminEmail }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Response status: 200");
    console.log("Response data:", data);
  })
  .catch((error) => {
    console.error("Request error:", error);
  });
