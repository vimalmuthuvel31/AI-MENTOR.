export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle browser preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    const {
      question,
      code,
      language,
      context
    } = req.body || {};

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        success: false,
        error: "Question is required"
      });
    }

    const q = question.toLowerCase().trim();
    const lang = (language || "").toLowerCase();

    let answer = "";

    // ---------------------------------------
    // JAVASCRIPT
    // ---------------------------------------

    if (
      q.includes("variable") ||
      q.includes("let") ||
      q.includes("const") ||
      q.includes("var")
    ) {
      answer = `
### 💡 Concept: Variables

A variable is a named container used to store information.

In JavaScript, you commonly use \`let\` and \`const\`.

### Example

\`\`\`javascript
let age = 18;
const name = "Alex";

console.log(name);
console.log(age);
\`\`\`

### 🧠 Understand it

- \`let\` → value can be changed later.
- \`const\` → value should not be reassigned.
- \`var\` → older way of declaring variables.

### 🎯 Mentor Hint

Before writing code, ask yourself:

**What information do I need to store?**

For example, if you need to store a student's age, a variable is useful.

Try changing \`age\` to another value and predict what the output will be.
`;
    }

    else if (
      q.includes("function") ||
      q.includes("method")
    ) {
      answer = `
### 💡 Concept: Functions

A function is a reusable block of code designed to perform a particular task.

### Example

\`\`\`javascript
function greet(name) {
  return "Hello " + name;
}

console.log(greet("Alex"));
\`\`\`

### 🧠 How it works

1. \`function greet(name)\` creates the function.
2. \`name\` is a parameter.
3. \`return\` sends a value back.
4. \`greet("Alex")\` calls the function.

### 🎯 Mentor Hint

Think of a function like a small machine:

**Input → Processing → Output**

Try creating a function that receives two numbers and returns their sum.
`;
    }

    else if (
      q.includes("loop") ||
      q.includes("for loop") ||
      q.includes("while loop")
    ) {
      answer = `
### 💡 Concept: Loops

A loop allows you to repeat a block of code.

### Example

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
\`\`\`

### Output

\`\`\`
1
2
3
4
5
\`\`\`

### 🧠 Understand it

The loop has three important parts:

- Starting value
- Condition
- Update

Here:

\`i = 1\` → starts the loop

\`i <= 5\` → decides when it continues

\`i++\` → increases the value

### 🎯 Mentor Hint

Before running a loop, predict:

**How many times will it execute?**
`;
    }

    else if (
      q.includes("array") ||
      q.includes("list")
    ) {
      answer = `
### 💡 Concept: Arrays

An array stores multiple values inside a single variable.

### Example

\`\`\`javascript
const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]);
\`\`\`

The output is:

\`\`\`
Apple
\`\`\`

### 🧠 Important

Array positions start from **0**.

So:

- \`fruits[0]\` → Apple
- \`fruits[1]\` → Banana
- \`fruits[2]\` → Mango

### 🎯 Mentor Hint

Try adding another fruit to the array and determine its index.
`;
    }

    // ---------------------------------------
    // HTML
    // ---------------------------------------

    else if (
      q.includes("html") ||
      q.includes("tag") ||
      q.includes("heading")
    ) {
      answer = `
### 💡 Concept: HTML

HTML is used to create the structure of a webpage.

### Example

\`\`\`html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello World</h1>
    <p>Welcome to my website.</p>
  </body>
</html>
\`\`\`

### 🧠 Understand it

- \`<h1>\` creates a main heading.
- \`<p>\` creates a paragraph.
- \`<body>\` contains visible webpage content.

Think of HTML as the **skeleton** of a webpage.

### 🎯 Mentor Hint

First decide what content your webpage needs. Then choose the appropriate HTML tags.
`;
    }

    // ---------------------------------------
    // CSS
    // ---------------------------------------

    else if (
      q.includes("css") ||
      q.includes("style") ||
      q.includes("color") ||
      q.includes("flexbox")
    ) {
      answer = `
### 💡 Concept: CSS

CSS controls the appearance and layout of a webpage.

### Example

\`\`\`css
h1 {
  font-size: 32px;
  text-align: center;
}
\`\`\`

### 🧠 Understand it

CSS usually follows this pattern:

\`\`\`
selector {
  property: value;
}
\`\`\`

For example:

\`h1\` → selector

\`font-size\` → property

\`32px\` → value

### 🎯 Mentor Hint

HTML creates the structure.

CSS controls the appearance.

JavaScript adds behavior.
`;
    }

    // ---------------------------------------
    // JAVA
    // ---------------------------------------

    else if (
      lang.includes("java") ||
      q.includes("java")
    ) {
      answer = `
### 💡 Java Mentor

Java is an object-oriented programming language.

### Example

\`\`\`java
public class Main {
    public static void main(String[] args) {
        int age = 18;
        System.out.println(age);
    }
}
\`\`\`

### 🧠 Understand it

- \`class\` defines a class.
- \`main()\` is the starting point of the program.
- \`int\` stores an integer.
- \`System.out.println()\` displays output.

### 🎯 Mentor Hint

Don't memorize the entire program.

Understand the role of each part first.
`;
    }

    // ---------------------------------------
    // C / C++
    // ---------------------------------------

    else if (
      lang.includes("c++") ||
      lang.includes("cpp") ||
      q.includes("c++")
    ) {
      answer = `
### 💡 C++ Mentor

C++ is a powerful programming language commonly used for problem solving and system-level programming.

### Example

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int age = 18;
    cout << age;

    return 0;
}
\`\`\`

### 🧠 Understand it

- \`#include <iostream>\` provides input/output functionality.
- \`main()\` is where execution starts.
- \`int\` stores an integer.
- \`cout\` displays output.

### 🎯 Mentor Hint

Start by understanding the flow:

**Declare → Process → Output**
`;
    }

    // ---------------------------------------
    // PYTHON
    // ---------------------------------------

    else if (
      lang.includes("python") ||
      q.includes("python")
    ) {
      answer = `
### 💡 Python Mentor

Python is known for its simple and readable syntax.

### Example

\`\`\`python
name = "Alex"
age = 18

print(name)
print(age)
\`\`\`

### 🧠 Understand it

Python doesn't require a declaration keyword such as \`int\` for a normal variable.

The variable is created when you assign a value.

### 🎯 Mentor Hint

Focus on understanding what each line does instead of memorizing syntax.
`;
    }

    // ---------------------------------------
    // ERROR / BUG DETECTION
    // ---------------------------------------

    else if (
      q.includes("error") ||
      q.includes("bug") ||
      q.includes("wrong") ||
      q.includes("not working") ||
      q.includes("mistake")
    ) {
      answer = `
### 🐞 Bug Detective Mode

Let's debug this step by step.

You provided:

\`\`\`
${code || "No code was provided."}
\`\`\`

### Step 1 — Check the syntax

Look for:

- Missing brackets
- Missing parentheses
- Missing quotation marks
- Misspelled keywords
- Incorrect variable names

### Step 2 — Check the logic

Ask yourself:

**What did I expect the program to do?**

Then compare it with:

**What is the program actually doing?**

### 🎯 Mentor Hint

Don't immediately rewrite the entire program.

Find the **first place where the program behaves differently from what you expected**.

That's usually the best place to start debugging.
`;
    }

    // ---------------------------------------
    // DEFAULT RESPONSE
    // ---------------------------------------

    else {
      answer = `
### 👨‍💻 Codegenius AI Mentor

Good question!

Let's approach it like a programmer rather than simply copying an answer.

### 🧠 First, understand the problem

Your question is:

> ${question}

${code ? `
### Your Code

\`\`\`
${code}
\`\`\`
` : ""}

### 🎯 Think about these questions

1. What is the input?
2. What output do you expect?
3. What part of the program is confusing?
4. Can you break the problem into smaller steps?

### 💡 Mentor Hint

Try solving the smallest part of the problem first.

Once you understand that part, build the next step on top of it.

If you tell me the programming language and the exact error or concept you're struggling with, I can guide you more specifically.
`;
    }

    // ---------------------------------------
    // RESPONSE
    // ---------------------------------------

    return res.status(200).json({
      success: true,
      answer: answer.trim(),
      source: "demo-mentor"
    });

  } catch (error) {
    console.error("Demo Mentor Error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to process the mentor request."
    });
  }
}
