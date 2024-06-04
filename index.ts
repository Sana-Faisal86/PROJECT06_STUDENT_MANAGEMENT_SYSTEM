#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = []; // intialize an empty array for courses:
    this.balance = 100;
  }
  // Method to Enroll a student in a course :
  enroll_course(course: string) {
    this.courses.push(course);
  }
  // Method to view a student balance:
  view_balance() {
    console.log(
      chalk.black.bgGray(
        `\n\t>>> Balance for ${chalk.black.bgGreen(
          this.name
        )} ==> $${chalk.black.bgGreenBright(this.balance)}`
      )
    );
  }
  //  method to pay student fees
  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(
      chalk.black.bgGray(
        `\n\t>>> ${chalk.black.bgGreenBright(
          this.name
        )} Fees paid Successfully for $${chalk.black.bgGreenBright(amount)}`
      )
    );
    console.log(
      chalk.black.bgGray(
        `\n\t>>> ${chalk.black.bgGreen(
          this.name
        )} Remaining Balance ==> $${chalk.black.bgGreenBright(this.balance)}`
      )
    );
  }
  show_status() {
    console.log(
      chalk.black.bgGray(`\n\t--ID : ${chalk.black.bgGreenBright(this.id)}`)
    );
    console.log(
      chalk.black.bgGray(`\t--Name : ${chalk.black.bgGreenBright(this.name)}`)
    );
    console.log(
      chalk.black.bgGray(
        `\t--Courses : ${chalk.black.bgGreenBright(this.courses)}`
      )
    );
    console.log(
      chalk.black.bgGray(
        `\t--Balance : ${chalk.black.bgGreenBright(this.balance)}`
      )
    );
  }
}
// Define a student_manager class to manage student:
class Student_manager {
  students: Student[];

  constructor() {
    this.students = [];
  }
  add_student(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      chalk.black.bgGray(
        `\n\t>>> Student ${chalk.black.bgGreen(
          name
        )} added Successfully. Student ID : ${chalk.black.bgGreen(student.id)}.`
      )
    );
  }

  //  Method to enroll a student in a course.

  enroll_student(student_id: number, course: string) {
    let student = this.find_student(student_id);
    if (student) {
      student.enroll_course(course);
      console.log(
        chalk.black.bgGray(
          `\n\t>>> ${chalk.black.bgGreen(
            student.name
          )} Enrolled in ${chalk.black.bgGreen(course)} Successfully !`
        )
      );
    }
  }
  // Method to view a student balance.

  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balance();
    } else {
      console.log(
        chalk.black.bgWhite(
          "\n\t>>> Student not found. Please enter a correct student ID !"
        )
      );
    }
  }
  pay_student_fees(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fees(amount);
    } else {
      console.log(
        chalk.black.bgWhite(
          "\n\t>>> Student not found. Please enter a correct student ID !"
        )
      );
    }
  }
  // Method  to display student status:
  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    }
  }
  // Method to find a student by student_id.
  find_student(student_id: number) {
    return this.students.find((std) => std.id === student_id);
  }
}
// Main function to run the program.
async function main() {
  console.log(chalk.black.bgRedBright("\n\t\t", "+".repeat(45)));
  console.log(
    "\t\t",
    chalk.black.bgBlueBright(" Wellcome Code to STUDENT MANAGEMENT SYSTEM ")
  );
  console.log(chalk.black.bgRedBright("\t\t", "+".repeat(45), "\n"));
  let student_manager = new Student_manager();

  // while loop to keep program running.

  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.red.bgWhite("\t>>> Select an Option ==>"),
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Show Status",
          "Exit",
        ],
      },
    ]);
    // Using switch case to handle user choice.

    switch (choice.choice) {
      case "Add Student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: chalk.red.bgWhite("\t>>> Enter a Student Name ==>"),
          },
        ]);
        student_manager.add_student(name_input.name);
        break;

      case "Enroll Student":
        let course_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.red.bgWhite("\t>>> Enter a Student ID ==>"),
          },
          {
            name: "course",
            type: "input",
            message: chalk.red.bgWhite("\t>>> Enter a Course Name ==>"),
          },
        ]);
        student_manager.enroll_student(
          course_input.student_id,
          course_input.course
        );
        break;

      case "View Student Balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.red.bgWhite("\t>>> Enter a student ID ==>"),
          },
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;

      case "Pay Fees":
        let fees_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.red.bgWhite("\t>>> Enter a student ID  ==>"),
          },
          {
            name: "amount",
            type: "number",
            message: chalk.red.bgWhite("\t>>> Enter the amount to pay ==>"),
          },
        ]);
        student_manager.pay_student_fees(
          fees_input.student_id,
          fees_input.amount
        );
        break;
      case "Show Status":
        let status_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: chalk.red.bgWhite("\t>>> Enter a student ID ==>"),
          },
        ]);
        student_manager.show_student_status(status_input.student_id);
        break;

      case "Exit":
        console.log(chalk.black.bgRedBright("\n\tExiting...."));
        process.exit();
    }
  }
}
// Calling a main function:
main();
