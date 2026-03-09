// Given 10 student objects (name, marks, subject): use array methods ONLY (no loops) to filter pass/fail, compute average, find topper, group by subject.

const students = [
  { name: "Amit", marks: 78, subject: "Math" },
  { name: "Neha", marks: 45, subject: "Science" },
  { name: "Rahul", marks: 90, subject: "Math" },
  { name: "Priya", marks: 55, subject: "English" },
  { name: "Arjun", marks: 33, subject: "Science" },
  { name: "Sneha", marks: 88, subject: "English" },
  { name: "Karan", marks: 62, subject: "Math" },
  { name: "Riya", marks: 71, subject: "Science" },
  { name: "Vikas", marks: 29, subject: "English" },
  { name: "Anjali", marks: 81, subject: "Math" }
];

//pass 
const passStudents = students.filter(s => s.marks >= 40);

//fail 
const failStudents = students.filter(s => s.marks < 40);

//Average
const averageMarks = students.reduce((sum, s) => sum + s.marks, 0) / students.length;

//Topper
const topper = students.reduce((top, s) => s.marks > top.marks ? s : top);

//Groupby Subject
const groupedBySubject = students.reduce((group, s) => {
  if (!group[s.subject]) {
    group[s.subject] = [];
  }
  group[s.subject].push(s);
  return group;
}, {});

console.log("Pass Students:", passStudents);
console.log("Fail Students:", failStudents);
console.log("Average Marks:", averageMarks);
console.log("Topper:", topper);
console.log("Grouped By Subject:", groupedBySubject);