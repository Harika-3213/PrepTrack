
const q = (question, answer, explanation, difficulty = "Medium", code = "") => ({
    question,
    answer,
    explanation,
    difficulty,
    ...(code ? { code } : {})
});

const topic = (name, questions, description = "") => ({
    name,
    description,
    questions
});

const companies = [
    {
        name: "Infosys",
        description: "Placement preparation for Infosys online assessment and interviews.",
        rounds: [
            {
                name: "Round 1 - Online Assessment",
                description: "Mathematical, logical, verbal and analytical reasoning practice.",
                topics: [
                    topic("Mathematical Ability", [
                        q("A number is increased by 20% and becomes 240. Find the original number.", "200", "Original = 240 / 1.2 = 200.", "Easy"),
                        q("A train travels 180 km in 3 hours. Find its average speed.", "60 km/hr", "Speed = Distance / Time = 180 / 3 = 60 km/hr.", "Easy"),
                        q("The average of five numbers is 24. If four numbers total 90, find the fifth number.", "30", "Total = 5 × 24 = 120. Fifth number = 120 - 90 = 30.", "Medium"),
                        q("A product costs ₹800 and is sold at a 15% profit. Find the selling price.", "₹920", "Profit = 15% of 800 = 120. Selling price = 800 + 120 = ₹920.", "Easy"),
                        q("A can complete work in 12 days and B in 6 days. How many days will they take together?", "4 days", "Combined work per day = 1/12 + 1/6 = 1/4. Time = 4 days.", "Medium")
                    ]),
                    topic("Logical Reasoning", [
                        q("Find the next number: 2, 6, 12, 20, 30, ?", "42", "Differences are 4, 6, 8, 10. Next difference is 12. Answer = 42.", "Easy"),
                        q("If CAT is coded as DBU, how is DOG coded?", "EPH", "Each letter is shifted forward by one position.", "Easy"),
                        q("Find the odd one out: 8, 27, 64, 100, 125.", "100", "8, 27, 64 and 125 are perfect cubes. 100 is not.", "Easy"),
                        q("A is taller than B. B is taller than C. Who is the shortest?", "C", "The order is A > B > C.", "Easy"),
                        q("Complete the series: 3, 9, 27, 81, ?", "243", "Each term is multiplied by 3.", "Easy")
                    ]),
                    topic("Verbal Ability", [
                        q("Choose the synonym of 'Abundant'.", "Plentiful", "Abundant means available in large quantities.", "Easy"),
                        q("Choose the antonym of 'Expand'.", "Contract", "Contract means to become smaller.", "Easy"),
                        q("Choose the correct sentence.", "She has been working here for two years.", "Use present perfect continuous with 'for' to describe an action continuing over a period.", "Medium"),
                        q("Fill in the blank: Neither of the answers ___ correct.", "is", "Neither is treated as singular in standard formal English.", "Medium"),
                        q("Choose the correctly spelled word.", "Accommodate", "The correct spelling contains double c and double m.", "Easy")
                    ]),
                    topic("Analytical Reasoning", [
                        q("All roses are flowers. Some flowers fade quickly. Can we conclude that all roses fade quickly?", "No", "The statement only says some flowers fade quickly. It does not establish that all roses do.", "Medium"),
                        q("If today is Monday, what day will it be after 45 days?", "Thursday", "45 modulo 7 = 3. Three days after Monday is Thursday.", "Easy"),
                        q("A person walks 5 km north and then 3 km east. In which direction is the person from the starting point?", "North-East", "The final position is north and east of the starting point.", "Easy"),
                        q("In a class of 40 students, Ravi ranks 12th from the top. What is his rank from the bottom?", "29th", "Bottom rank = 40 - 12 + 1 = 29.", "Medium"),
                        q("If P is the brother of Q and Q is the sister of R, how is P related to R?", "Brother", "P and R are siblings, and P is male.", "Easy")
                    ])
                ]
            },
            {
                name: "Round 2 - Coding Assessment",
                description: "Programming, data structures and problem-solving practice.",
                topics: [
                    topic("Python Programming", [
                        q("What is the output of print(type([]))?", "<class 'list'>", "Square brackets create a Python list.", "Easy"),
                        q("What is the difference between a list and a tuple?", "Lists are mutable; tuples are immutable.", "A list can be modified after creation. A tuple cannot be modified.", "Easy"),
                        q("What is the output of print(10 // 3)?", "3", "The // operator performs floor division.", "Easy"),
                        q("Write a Python program to check whether a number is a palindrome.", "Palindrome or Not Palindrome", "Reverse the number and compare it with the original number.", "Easy", `n = int(input())
original = n
rev = 0

while n > 0:
    digit = n % 10
    rev = rev * 10 + digit
    n //= 10

if original == rev:
    print("Palindrome")
else:
    print("Not Palindrome")`),
                        q("What is the time complexity of searching for a key in a Python dictionary on average?", "O(1)", "Python dictionaries use hash tables, giving average constant-time lookup.", "Medium")
                    ]),
                    topic("Arrays and Strings", [
                        q("Find the second largest distinct element in an array.", "Track the largest and second largest values.", "Traverse once while updating the largest and second largest distinct values.", "Medium", `arr = [10, 5, 20, 8, 20]
first = second = float('-inf')

for x in arr:
    if x > first:
        second = first
        first = x
    elif first > x > second:
        second = x

print(second)`),
                        q("What is the output of 'python'[::-1]?", "nohtyp", "A negative step in slicing traverses the string backwards.", "Easy"),
                        q("How can you check whether two strings are anagrams?", "Compare their character frequencies.", "Two strings are anagrams if they contain the same characters with the same frequencies.", "Medium"),
                        q("Write Python code to count vowels in a string.", "Number of vowels", "Check each character against the set of vowels.", "Easy", `s = input().lower()
count = 0

for ch in s:
    if ch in "aeiou":
        count += 1

print(count)`),
                        q("What is the time complexity of binary search on a sorted array?", "O(log n)", "The search space is halved after every comparison.", "Easy")
                    ]),
                    topic("Algorithms", [
                        q("Which algorithm is commonly used to find the shortest path in a graph with non-negative edge weights?", "Dijkstra's algorithm", "Dijkstra repeatedly selects the unvisited vertex with the smallest known distance.", "Medium"),
                        q("What is the average time complexity of merge sort?", "O(n log n)", "Merge sort divides the array and merges sorted halves.", "Medium"),
                        q("Which data structure is used in BFS?", "Queue", "BFS explores vertices level by level using a queue.", "Easy"),
                        q("What is the worst-case time complexity of quicksort?", "O(n²)", "This can occur when partitions are highly unbalanced.", "Medium"),
                        q("Which technique solves a problem by dividing it into smaller subproblems?", "Divide and Conquer", "Merge sort and binary search are common examples.", "Easy")
                    ]),
                    topic("Advanced Problem Solving", [
                        q("What is dynamic programming?", "Solving overlapping subproblems and storing their results.", "DP avoids repeated computation by using memoization or tabulation.", "Medium"),
                        q("What is the time complexity of generating all subsets of an array of n elements?", "O(2^n)", "Each element has two choices: include it or exclude it.", "Hard"),
                        q("Which data structure is commonly used to implement a priority queue efficiently?", "Heap", "A binary heap supports efficient insertion and removal of the highest-priority element.", "Medium"),
                        q("What is a greedy algorithm?", "An algorithm that makes the locally optimal choice at each step.", "Greedy choices can lead to a global optimum for suitable problems.", "Medium"),
                        q("What is the purpose of memoization?", "To store results of previously solved subproblems.", "Memoization prevents repeated recursive calculations.", "Medium")
                    ])
                ]
            },
            {
                name: "Round 3 - Technical Interview",
                description: "Core computer science and project-based interview preparation.",
                topics: [
                    topic("Programming Fundamentals", [
                        q("What is the difference between a compiler and an interpreter?", "A compiler translates a program before execution; an interpreter executes instructions through an interpreter.", "Compilation commonly produces an executable or intermediate representation, while interpretation processes instructions during execution.", "Easy"),
                        q("What is recursion?", "A function calling itself.", "A recursive function must have a base condition to stop further calls.", "Easy"),
                        q("What is exception handling?", "Handling runtime errors using mechanisms such as try and except.", "Exception handling prevents unexpected errors from terminating normal program flow.", "Easy"),
                        q("What is the difference between == and is in Python?", "== compares values; is compares object identity.", "Two objects can have equal values without being the same object.", "Medium"),
                        q("What is a lambda function?", "A small anonymous function defined using lambda.", "Example: square = lambda x: x * x.", "Easy")
                    ]),
                    topic("OOP Concepts", [
                        q("What are the four main principles of OOP?", "Encapsulation, Abstraction, Inheritance and Polymorphism.", "These principles help structure reusable and maintainable object-oriented programs.", "Easy"),
                        q("What is inheritance?", "A class acquiring properties and methods of another class.", "It supports code reuse and hierarchical relationships.", "Easy"),
                        q("What is polymorphism?", "The ability of the same interface or operation to have different implementations.", "Method overriding is a common example.", "Medium"),
                        q("What is encapsulation?", "Bundling data and methods together and controlling access to data.", "It helps protect an object's internal state.", "Easy"),
                        q("What is method overriding?", "A child class providing its own implementation of an inherited method.", "The child implementation is used when the method is called on the child object.", "Medium")
                    ]),
                    topic("DBMS and SQL", [
                        q("What is a primary key?", "A column or set of columns that uniquely identifies each row.", "A primary key must be unique and cannot contain NULL values.", "Easy"),
                        q("What is a foreign key?", "A column that references a key in another table.", "It helps maintain referential integrity between related tables.", "Easy"),
                        q("What is normalization?", "Organizing database tables to reduce redundancy and anomalies.", "Normalization separates data into related tables based on dependencies.", "Medium"),
                        q("Write an SQL query to retrieve employees whose salary is greater than 50000.", "SELECT * FROM employees WHERE salary > 50000;", "WHERE filters rows based on a condition.", "Easy", `SELECT *
FROM employees
WHERE salary > 50000;`),
                        q("What is the difference between DELETE and TRUNCATE?", "DELETE removes selected rows; TRUNCATE removes all rows from a table.", "DELETE supports a WHERE clause. TRUNCATE removes all table rows and generally resets storage allocation.", "Medium")
                    ]),
                    topic("Data Structures", [
                        q("Which data structure follows LIFO?", "Stack", "The last inserted element is removed first.", "Easy"),
                        q("Which data structure follows FIFO?", "Queue", "The first inserted element is removed first.", "Easy"),
                        q("What is a linked list?", "A linear data structure consisting of nodes connected by links.", "Each node stores data and a reference to the next node.", "Easy"),
                        q("What is the average search complexity in a balanced binary search tree?", "O(log n)", "A balanced tree keeps its height logarithmic in the number of nodes.", "Medium"),
                        q("What is hashing?", "Mapping a key to an index using a hash function.", "Hashing enables efficient average-case insertion, deletion and lookup.", "Medium")
                    ]),
                    topic("Operating Systems", [
                        q("What is a process?", "A program in execution.", "A process has its own execution state and resources.", "Easy"),
                        q("What is a thread?", "A lightweight unit of execution within a process.", "Threads in the same process share its memory space.", "Easy"),
                        q("What are the four necessary conditions for deadlock?", "Mutual exclusion, hold and wait, no preemption and circular wait.", "Deadlock requires all four Coffman conditions to hold simultaneously.", "Medium"),
                        q("What is virtual memory?", "A memory management technique that provides a virtual address space.", "It allows processes to use an address space that can be larger than physical RAM.", "Medium"),
                        q("What is context switching?", "Saving one process or thread state and loading another.", "The operating system uses it to share CPU time among tasks.", "Medium")
                    ]),
                    topic("Computer Networks", [
                        q("Which protocol provides reliable, connection-oriented communication?", "TCP", "TCP uses acknowledgements, sequencing and retransmission.", "Easy"),
                        q("What is the default port number of HTTP?", "80", "HTTP commonly uses TCP port 80.", "Easy"),
                        q("What is DNS?", "Domain Name System", "DNS translates domain names into IP addresses and other records.", "Easy"),
                        q("How many layers are present in the OSI model?", "7", "Physical, Data Link, Network, Transport, Session, Presentation and Application.", "Easy"),
                        q("What is the difference between TCP and UDP?", "TCP is connection-oriented and reliable; UDP is connectionless with no delivery guarantee.", "TCP provides ordered reliable delivery. UDP has lower overhead but does not guarantee delivery.", "Medium")
                    ]),
                    topic("Project Discussion", [
                        q("How should you explain your project in an interview?", "Explain the problem, objective, technologies, architecture, your contribution and results.", "A clear project explanation demonstrates both technical understanding and ownership.", "Easy"),
                        q("Why did you choose the MERN stack?", "It uses JavaScript across the frontend and backend and integrates well with MongoDB.", "React, Express, Node.js and MongoDB support full-stack JavaScript development.", "Medium"),
                        q("How do you protect a user password in a web application?", "Hash passwords using a password-hashing algorithm such as bcrypt.", "Never store plain-text passwords. Use secure authentication and protect secrets.", "Medium"),
                        q("What is REST API?", "An architectural style for designing network-based APIs around resources.", "REST commonly uses HTTP methods such as GET, POST, PUT and DELETE.", "Easy"),
                        q("How would you debug an API that returns a 500 error?", "Check server logs, reproduce the request, inspect the stack trace and validate database and input handling.", "A systematic debugging process helps identify the failing backend operation.", "Medium")
                    ])
                ]
            },
            {
                name: "Round 4 - HR Interview",
                description: "Personal introduction, communication and behavioural questions.",
                topics: [
                    topic("HR Interview Questions", [
                        q("Tell me about yourself.", "Give a concise introduction covering education, skills, projects and career goals.", "Keep the answer structured and relevant to the role.", "Easy"),
                        q("Why do you want to join Infosys?", "Connect your interest in technology with the company's learning opportunities and work.", "Give a genuine answer and relate it to your career goals.", "Medium"),
                        q("What are your strengths?", "Mention two or three strengths supported by examples.", "For example, problem-solving, consistency or teamwork with a real situation.", "Easy"),
                        q("What is one weakness you are improving?", "Mention a genuine manageable weakness and explain the steps you are taking to improve it.", "Avoid presenting a strength disguised as a weakness without an example.", "Medium"),
                        q("Where do you see yourself in five years?", "Describe a realistic goal involving technical growth, responsibility and contribution.", "Show willingness to learn and grow with the organization.", "Easy"),
                        q("How do you handle a disagreement in a team?", "Listen, understand different views, discuss evidence and work toward a shared decision.", "Demonstrate collaboration and professional communication.", "Medium"),
                        q("Why should we hire you?", "Explain how your skills, learning attitude and project experience match the role.", "Support your answer with specific examples rather than generic claims.", "Medium")
                    ])
                ]
            }
        ]
    },

    {
        name: "Accenture",
        description: "Placement preparation for Accenture cognitive, technical and interview rounds.",
        rounds: [
            {
                name: "Round 1 - Cognitive Assessment",
                description: "Numerical, logical, verbal and abstract reasoning practice.",
                topics: [
                    topic("Numerical Ability", [
                        q("Find 25% of 640.", "160", "25% = 1/4. Therefore 640 / 4 = 160.", "Easy"),
                        q("A car covers 150 km in 2.5 hours. Find its speed.", "60 km/hr", "Speed = 150 / 2.5 = 60 km/hr.", "Easy"),
                        q("The ratio of two numbers is 3:5 and their sum is 64. Find the smaller number.", "24", "Total parts = 8. One part = 64 / 8 = 8. Smaller = 3 × 8 = 24.", "Medium"),
                        q("Find the simple interest on ₹5000 at 8% per annum for 2 years.", "₹800", "SI = P × R × T / 100 = 5000 × 8 × 2 / 100.", "Easy"),
                        q("A shop gives a 10% discount on ₹1200. Find the final price.", "₹1080", "Discount = ₹120. Final price = ₹1200 - ₹120 = ₹1080.", "Easy")
                    ]),
                    topic("Logical Reasoning", [
                        q("Find the next term: 5, 10, 20, 40, ?", "80", "Each term is multiplied by 2.", "Easy"),
                        q("If BOOK is coded as CPPL, how is PEN coded?", "QFO", "Each letter is shifted forward by one position.", "Easy"),
                        q("Find the odd one out: Apple, Mango, Carrot, Banana.", "Carrot", "Carrot is commonly classified as a vegetable; the others are fruits.", "Easy"),
                        q("A is east of B and C is north of A. In which direction is C from B?", "North-East", "C is both north and east of B.", "Easy"),
                        q("If 4 workers finish a task in 12 days, how many days will 8 workers take at the same rate?", "6 days", "Total work = 4 × 12 = 48 worker-days. 48 / 8 = 6 days.", "Medium")
                    ]),
                    topic("Verbal Ability", [
                        q("Choose the synonym of 'Diligent'.", "Hardworking", "Diligent means showing careful and persistent effort.", "Easy"),
                        q("Choose the antonym of 'Scarce'.", "Abundant", "Scarce means insufficient or in short supply.", "Easy"),
                        q("Fill in the blank: She is good ___ mathematics.", "at", "The correct expression is 'good at'.", "Easy"),
                        q("Choose the correct form: Each of the students ___ present.", "is", "Each is grammatically singular.", "Medium"),
                        q("What is the meaning of 'Break the ice'?", "To start a conversation and reduce awkwardness.", "It is an idiom about making people feel more comfortable.", "Easy")
                    ]),
                    topic("Abstract Reasoning", [
                        q("What comes next in the pattern: Circle, Square, Circle, Square, ?", "Circle", "The pattern alternates between circle and square.", "Easy"),
                        q("A pattern rotates 90 degrees clockwise each step. What is the direction after two rotations?", "180 degrees clockwise", "Two 90-degree rotations equal 180 degrees.", "Easy"),
                        q("Find the odd one out: Triangle, Square, Pentagon, Sphere.", "Sphere", "The first three are 2D polygons; a sphere is a 3D object.", "Easy"),
                        q("How many sides does a hexagon have?", "6", "A hexagon is a six-sided polygon.", "Easy"),
                        q("If a shape is reflected across a vertical line, what changes?", "Its left-right orientation is reversed.", "A vertical reflection produces a mirror image.", "Medium")
                    ])
                ]
            },
            {
                name: "Round 2 - Technical Assessment",
                description: "Programming fundamentals, pseudocode and coding practice.",
                topics: [
                    topic("Programming Fundamentals", [
                        q("What is an array?", "A collection of elements stored under one variable name.", "Arrays provide indexed access to elements.", "Easy"),
                        q("What is the difference between a while loop and a for loop?", "A for loop commonly iterates over a sequence; a while loop repeats while a condition is true.", "Both are iteration constructs.", "Easy"),
                        q("What is the output of 2 ** 3 in Python?", "8", "The ** operator performs exponentiation.", "Easy"),
                        q("What is a function?", "A reusable block of code that performs a task.", "Functions improve modularity and reduce code duplication.", "Easy"),
                        q("What is the purpose of a base case in recursion?", "To stop recursive calls.", "Without a reachable base case, recursion may continue until a recursion error or stack overflow.", "Medium")
                    ]),
                    topic("Pseudocode", [
                        q("What is pseudocode?", "An informal, language-independent description of an algorithm.", "It explains logic without requiring exact programming-language syntax.", "Easy"),
                        q("What is the output if x = 5 and the pseudocode sets x = x * 2, then prints x?", "10", "The updated value is 5 × 2 = 10.", "Easy"),
                        q("What is the time complexity of a single loop running n times?", "O(n)", "The number of iterations grows linearly with n.", "Easy"),
                        q("What is the output of a loop that prints i for i from 1 through 3?", "1 2 3", "The loop includes the start and end values when the pseudocode specifies an inclusive range.", "Easy"),
                        q("What is the purpose of an if-else statement?", "To choose between alternative execution paths based on a condition.", "The condition determines which branch executes.", "Easy")
                    ]),
                    topic("CS Fundamentals", [
                        q("What is an operating system?", "System software that manages hardware and software resources.", "It manages processes, memory, files and devices.", "Easy"),
                        q("What is a database index?", "A data structure that speeds up data retrieval.", "Indexes can improve reads but add storage and write overhead.", "Medium"),
                        q("What is the difference between RAM and ROM?", "RAM is volatile working memory; ROM is non-volatile memory.", "RAM normally loses its contents when power is removed.", "Easy"),
                        q("What does an IP address identify?", "A network interface or host on an IP network.", "IP addresses support packet routing and communication.", "Easy"),
                        q("What is the purpose of a compiler?", "To translate source code into another form, often machine code or intermediate code.", "Compilation can detect errors before program execution.", "Easy")
                    ]),
                    topic("Coding Problems", [
                        q("Write Python code to find the sum of digits of a number.", "Sum of all digits", "Repeatedly take the last digit using modulo 10 and remove it using integer division.", "Easy", `n = int(input())
total = 0

while n > 0:
    total += n % 10
    n //= 10

print(total)`),
                        q("Write Python code to check whether a number is prime.", "Prime or Not Prime", "A prime number has exactly two positive divisors. Check divisors up to the square root of n.", "Medium", `n = int(input())

if n < 2:
    print("Not Prime")
else:
    is_prime = True

    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            is_prime = False
            break

    print("Prime" if is_prime else "Not Prime")`),
                        q("Write Python code to reverse a string.", "Reversed string", "String slicing with a step of -1 returns the reversed string.", "Easy", `s = input()
print(s[::-1])`),
                        q("Write Python code to find the largest element in an array.", "Maximum element", "Traverse the array and maintain the largest value found so far.", "Easy", `arr = list(map(int, input().split()))
largest = arr[0]

for x in arr:
    if x > largest:
        largest = x

print(largest)`),
                        q("What is the time complexity of two nested loops, each running n times?", "O(n²)", "The inner loop executes n times for each of n outer iterations.", "Medium")
                    ])
                ]
            },
            {
                name: "Round 3 - Communication and Interview",
                description: "Communication, technical discussion and HR practice.",
                topics: [
                    topic("Communication Skills", [
                        q("What makes a technical explanation effective?", "Clear structure, simple language and relevant examples.", "Explain the problem, approach and result in a logical order.", "Easy"),
                        q("How should you respond when you do not know an interview answer?", "Be honest, explain what you do know and show how you would find the answer.", "Avoid guessing confidently or pretending to know.", "Easy"),
                        q("Why is active listening important in a team?", "It helps understand requirements, avoid misunderstandings and collaborate effectively.", "Listening improves communication and teamwork.", "Easy"),
                        q("How can you make a presentation more effective?", "Use a clear structure, readable visuals and concise explanations.", "Practice beforehand and focus on the audience's needs.", "Easy"),
                        q("How should you handle feedback?", "Listen carefully, clarify the feedback and use it to improve.", "A constructive response demonstrates adaptability.", "Easy")
                    ]),
                    topic("Technical Interview", [
                        q("What is API?", "Application Programming Interface.", "An API defines how software components communicate.", "Easy"),
                        q("What is the difference between GET and POST?", "GET retrieves data; POST submits data for processing or creation.", "GET is intended for retrieval; POST commonly sends a request body.", "Easy"),
                        q("What is a REST API?", "An API designed around resources and standard HTTP methods.", "REST APIs commonly exchange JSON data over HTTP.", "Easy"),
                        q("What is Git?", "A distributed version control system.", "Git tracks source-code changes and supports collaboration.", "Easy"),
                        q("What is the difference between authentication and authorization?", "Authentication verifies identity; authorization checks permissions.", "Logging in establishes identity; access control determines what the user can do.", "Medium")
                    ]),
                    topic("Project Discussion", [
                        q("How do you describe your individual contribution to a project?", "Explain the modules you designed, implemented, tested and maintained.", "Be specific about your own work and decisions.", "Easy"),
                        q("What is the role of MongoDB in a MERN application?", "It stores application data as flexible BSON documents.", "The backend communicates with MongoDB through a driver or ODM such as Mongoose.", "Easy"),
                        q("Why is input validation important?", "It prevents invalid or unexpected data from entering the application.", "Validate on both client and server; server-side validation is essential.", "Medium"),
                        q("How would you test a login feature?", "Test valid login, invalid password, unknown user, missing fields and protected routes.", "Include both positive and negative test cases.", "Medium"),
                        q("What would you improve in your project if given more time?", "Identify a practical improvement such as security, testing, performance or usability.", "Choose an improvement you can explain technically.", "Medium")
                    ]),
                    topic("HR Interview Questions", [
                        q("Why do you want to work at Accenture?", "Connect your career interests with technology, client-focused work and continuous learning.", "Make the answer specific and genuine.", "Medium"),
                        q("Describe a challenge you faced in a project.", "Explain the situation, your action and the result.", "Use a clear situation-action-result structure.", "Easy"),
                        q("Are you comfortable learning new technologies?", "Yes, explain how you approach learning and applying unfamiliar tools.", "Support the answer with an example if possible.", "Easy"),
                        q("How do you manage deadlines?", "Break work into tasks, prioritize and track progress.", "Communicate early if a risk affects delivery.", "Easy"),
                        q("Do you prefer working alone or in a team?", "Explain that you can work independently and collaborate when needed.", "Give an example of both if possible.", "Easy")
                    ])
                ]
            }
        ]
    },

    {
        name: "Cognizant",
        description: "Placement preparation for Cognizant aptitude, technical and interview rounds.",
        rounds: [
            {
                name: "Round 1 - Aptitude Assessment",
                description: "Quantitative, logical, verbal and numerical practice.",
                topics: [
                    topic("Quantitative", [
                        q("Find 40% of 250.", "100", "250 × 40 / 100 = 100.", "Easy"),
                        q("A person buys an item for ₹600 and sells it for ₹750. Find the profit percentage.", "25%", "Profit = 150. Profit percentage = 150 / 600 × 100 = 25%.", "Medium"),
                        q("The average of 10, 20, 30 and 40 is?", "25", "Average = 100 / 4 = 25.", "Easy"),
                        q("A pipe fills a tank in 5 hours. What fraction of the tank does it fill in one hour?", "1/5", "One-hour work = 1 / 5 of the tank.", "Easy"),
                        q("If 6 notebooks cost ₹90, what is the cost of 10 notebooks at the same rate?", "₹150", "One notebook costs ₹15. Ten cost ₹150.", "Easy")
                    ]),
                    topic("Logical", [
                        q("Find the next number: 1, 4, 9, 16, 25, ?", "36", "These are squares of 1, 2, 3, 4, 5 and 6.", "Easy"),
                        q("If SOUTH is written as TPVUI, how is NORTH written using the same rule?", "OPSUI", "Each letter is shifted forward by one position.", "Medium"),
                        q("Find the odd number: 11, 13, 17, 21, 23.", "21", "All the others are prime numbers; 21 is divisible by 3 and 7.", "Easy"),
                        q("A is the father of B. B is the mother of C. How is A related to C?", "Grandfather", "A is the parent of C's mother.", "Easy"),
                        q("If 1 January is Wednesday, what day is 8 January?", "Wednesday", "Seven days later is the same weekday.", "Easy")
                    ]),
                    topic("Verbal", [
                        q("Choose the synonym of 'Rapid'.", "Fast", "Rapid means happening quickly.", "Easy"),
                        q("Choose the antonym of 'Ancient'.", "Modern", "Modern refers to the present or recent times.", "Easy"),
                        q("Fill in the blank: He is interested ___ programming.", "in", "The correct expression is 'interested in'.", "Easy"),
                        q("Choose the correct sentence.", "The team has completed its work.", "A singular collective noun can take a singular verb in this usage.", "Medium"),
                        q("What does 'Once in a blue moon' mean?", "Very rarely", "The idiom describes something that happens infrequently.", "Easy")
                    ]),
                    topic("Numerical Ability", [
                        q("Convert 0.75 into a fraction in simplest form.", "3/4", "0.75 = 75/100 = 3/4.", "Easy"),
                        q("Find the LCM of 6 and 8.", "24", "The smallest number divisible by both 6 and 8 is 24.", "Easy"),
                        q("Find the HCF of 24 and 36.", "12", "12 is the greatest number that divides both 24 and 36.", "Easy"),
                        q("A number is divisible by 9 when what condition is satisfied?", "The sum of its digits is divisible by 9.", "This is the divisibility rule for 9.", "Easy"),
                        q("What is 15% of 200?", "30", "200 × 15 / 100 = 30.", "Easy")
                    ])
                ]
            },
            {
                name: "Round 2 - Technical and Coding Assessment",
                description: "Programming, arrays, strings, SQL and advanced coding practice.",
                topics: [
                    topic("Python Coding", [
                        q("Write Python code to print the Fibonacci sequence for n terms.", "Fibonacci sequence", "Start with 0 and 1; each next value is the sum of the previous two.", "Easy", `n = int(input())
a, b = 0, 1

for _ in range(n):
    print(a, end=" ")
    a, b = b, a + b`),
                        q("What is the output of len(set([1, 2, 2, 3]))?", "3", "A set stores unique elements only.", "Easy"),
                        q("What is list comprehension?", "A concise way to create lists using an expression and iteration.", "Example: squares = [x*x for x in range(5)].", "Easy"),
                        q("Write Python code to find the factorial of a number.", "Factorial value", "Multiply all integers from 1 through n. Define 0! as 1.", "Easy", `n = int(input())
fact = 1

for i in range(1, n + 1):
    fact *= i

print(fact)`),
                        q("What is the average time complexity of dictionary insertion in Python?", "O(1)", "Hash-table insertion is constant time on average, though worst cases can be slower.", "Medium")
                    ]),
                    topic("Arrays", [
                        q("Write Python code to find the sum of all elements in an array.", "Sum of array elements", "Traverse the array and accumulate the values.", "Easy", `arr = list(map(int, input().split()))
total = 0

for x in arr:
    total += x

print(total)`),
                        q("How can you remove duplicates from a list while preserving order?", "Use a set to track seen values and build a result list.", "This takes average O(n) time when set operations are O(1).", "Medium", `arr = [1, 2, 2, 3, 1]
seen = set()
result = []

for x in arr:
    if x not in seen:
        result.append(x)
        seen.add(x)

print(result)`),
                        q("What is the time complexity of accessing an array element by index?", "O(1)", "Direct indexing uses the element's offset.", "Easy"),
                        q("What is a two-pointer technique?", "Using two indices to process a sequence efficiently.", "It is useful in sorted-array pair problems and string comparisons.", "Medium"),
                        q("Given [2, 4, 6, 8], what is the pair whose sum is 10?", "(2, 8) and (4, 6)", "Both pairs add up to the target value 10.", "Easy")
                    ]),
                    topic("Strings", [
                        q("How do you check whether a string is a palindrome in Python?", "Compare the string with its reverse.", "For a simple case, s == s[::-1] checks whether the string reads the same backwards.", "Easy", `s = input()
print("Palindrome" if s == s[::-1] else "Not Palindrome")`),
                        q("What is the output of 'hello'.upper()?", "HELLO", "upper() returns an uppercase version of the string.", "Easy"),
                        q("Are Python strings mutable?", "No, Python strings are immutable.", "String operations create new strings rather than modifying the original string.", "Easy"),
                        q("How can you count the frequency of each character in a string?", "Use a dictionary to count each character.", "Increment the count for each character while traversing the string.", "Medium", `s = input()
freq = {}

for ch in s:
    freq[ch] = freq.get(ch, 0) + 1

print(freq)`),
                        q("What is the time complexity of checking whether a character exists in a Python string of length n?", "O(n)", "In the worst case, the string must be scanned.", "Medium")
                    ]),
                    topic("SQL Problems", [
                        q("Write a query to display all records from a table named students.", "SELECT * FROM students;", "The asterisk selects all columns.", "Easy", `SELECT * FROM students;`),
                        q("Write a query to find the highest salary in an employees table.", "SELECT MAX(salary) FROM employees;", "MAX returns the largest non-NULL value in the selected column.", "Easy", `SELECT MAX(salary) FROM employees;`),
                        q("Which SQL clause groups rows with the same values?", "GROUP BY", "GROUP BY is commonly used with aggregate functions.", "Easy"),
                        q("What is the difference between WHERE and HAVING?", "WHERE filters rows before grouping; HAVING filters groups after grouping.", "HAVING is commonly used with aggregate conditions.", "Medium"),
                        q("Write a query to count employees in each department.", "SELECT department, COUNT(*) FROM employees GROUP BY department;", "GROUP BY creates one group for each department.", "Medium", `SELECT department, COUNT(*)
FROM employees
GROUP BY department;`)
                    ]),
                    topic("Advanced Coding", [
                        q("What is the time complexity of the two-sum hash-map approach?", "O(n) average time", "Each element is processed once with average constant-time hash lookup.", "Medium"),
                        q("What is the sliding window technique?", "Maintaining a moving range over a sequence.", "It can reduce repeated work in subarray and substring problems.", "Medium"),
                        q("What is the difference between BFS and DFS?", "BFS explores level by level; DFS explores a path deeply before backtracking.", "BFS commonly uses a queue, while DFS commonly uses a stack or recursion.", "Medium"),
                        q("What is the time complexity of linear search?", "O(n)", "In the worst case every element is checked.", "Easy"),
                        q("When is binary search applicable?", "When the search space is ordered or satisfies the required monotonic condition.", "For a standard sorted array, each step halves the remaining search range.", "Medium")
                    ])
                ]
            },
            {
                name: "Round 3 - Technical Interview",
                description: "Programming language, OOP, database and project interview topics.",
                topics: [
                    topic("Python", [
                        q("What is PEP 8?", "Python's style guide for writing readable code.", "It recommends conventions for naming, indentation and formatting.", "Easy"),
                        q("What is the difference between append() and extend()?", "append adds one item; extend adds elements from an iterable.", "append([2, 3]) adds a nested list, while extend([2, 3]) adds two elements.", "Medium"),
                        q("What is a dictionary in Python?", "A mutable mapping of keys to values.", "Dictionaries provide average constant-time key lookup.", "Easy"),
                        q("What is a generator?", "An iterator-producing function or expression that yields values lazily.", "Generators can reduce memory use for large sequences.", "Medium"),
                        q("What is the purpose of __init__()?", "It initializes a newly created object.", "It is commonly used to set instance attributes.", "Easy")
                    ]),
                    topic("Java", [
                        q("What is JVM?", "Java Virtual Machine.", "JVM executes Java bytecode.", "Easy"),
                        q("What is the difference between JDK, JRE and JVM?", "JDK is the development kit, JRE provides the runtime environment, and JVM executes bytecode.", "The JDK includes development tools; the JRE includes the runtime components.", "Medium"),
                        q("What is method overloading?", "Defining methods with the same name but different parameter lists.", "Overloading is resolved based on method signatures at compile time.", "Medium"),
                        q("What is an interface in Java?", "A reference type that defines a contract for implementing classes.", "Classes implement interfaces and provide required behavior.", "Easy"),
                        q("Why is Java platform independent?", "Java bytecode can run on any compatible JVM.", "The JVM abstracts differences between operating systems and hardware.", "Medium")
                    ]),
                    topic("OOP", [
                        q("What is abstraction?", "Showing essential features while hiding implementation details.", "Abstract classes and interfaces support abstraction.", "Easy"),
                        q("What is a constructor?", "A special method or mechanism used to initialize an object.", "In Java, a constructor has the class name and no return type.", "Easy"),
                        q("What is the difference between overloading and overriding?", "Overloading changes parameter lists; overriding redefines inherited behavior.", "Overloading is resolved using method signatures; overriding uses runtime dispatch in typical polymorphic calls.", "Medium"),
                        q("What is composition?", "Building a class using objects of other classes.", "Composition models a has-a relationship.", "Medium"),
                        q("What is an abstract class?", "A class that cannot be instantiated directly and can define abstract and concrete methods.", "It provides a common base for subclasses.", "Medium")
                    ]),
                    topic("DBMS", [
                        q("What is a transaction?", "A logical unit of database work.", "A transaction may contain one or more database operations.", "Easy"),
                        q("What does ACID stand for?", "Atomicity, Consistency, Isolation and Durability.", "These properties describe reliable transaction processing.", "Easy"),
                        q("What is a candidate key?", "A minimal set of attributes that uniquely identifies a row.", "A table can have multiple candidate keys; one may be selected as the primary key.", "Medium"),
                        q("What is a join?", "An operation that combines rows from related tables.", "Joins use matching columns or conditions to combine data.", "Easy"),
                        q("What is a database view?", "A virtual table defined by a query.", "A view can simplify queries and restrict access to selected data.", "Medium")
                    ]),
                    topic("Data Structures", [
                        q("What is the difference between an array and a linked list?", "Arrays support direct indexing; linked lists use connected nodes.", "Arrays usually have better cache locality, while linked lists support efficient insertion when the node position is known.", "Medium"),
                        q("What is a binary tree?", "A tree in which each node has at most two children.", "The children are commonly called left and right.", "Easy"),
                        q("What is a hash collision?", "When two different keys map to the same hash-table index.", "Collision handling techniques include chaining and open addressing.", "Medium"),
                        q("What is a graph?", "A collection of vertices connected by edges.", "Graphs can represent networks, dependencies and relationships.", "Easy"),
                        q("What is a heap?", "A complete binary tree that satisfies the heap property.", "A min-heap has the smallest element at the root; a max-heap has the largest.", "Medium")
                    ]),
                    topic("Project Discussion", [
                        q("What problem does your project solve?", "Explain the user problem and how the application addresses it.", "Start with the problem before describing the technologies.", "Easy"),
                        q("What is middleware in Express.js?", "A function that can access the request, response and next middleware function.", "Middleware can perform authentication, logging, validation and other tasks.", "Medium"),
                        q("Why use Mongoose?", "It provides schema-based modeling and tools for working with MongoDB in Node.js.", "It supports validation, models, queries and middleware.", "Easy"),
                        q("How do you secure API routes?", "Use authentication, authorization, input validation and secure configuration.", "Also use HTTPS, safe password hashing and appropriate error handling.", "Medium"),
                        q("How would you explain a technical challenge you solved?", "Describe the issue, the investigation, the solution and the outcome.", "Use a concrete example from your project.", "Medium")
                    ])
                ]
            },
            {
                name: "Round 4 - HR Interview",
                description: "Behavioural and personal interview practice.",
                topics: [
                    topic("HR Interview Questions", [
                        q("Introduce yourself.", "Summarize your education, technical skills, project and career objective.", "Keep it concise and relevant to the position.", "Easy"),
                        q("Why Cognizant?", "Explain how the role and learning opportunities align with your interests.", "Research the role and provide a genuine reason.", "Medium"),
                        q("How do you handle pressure?", "Prioritize tasks, break them into smaller steps and communicate clearly.", "Give a real example if possible.", "Easy"),
                        q("Tell me about a time you learned something quickly.", "Describe what you learned, how you learned it and how you applied it.", "Use a specific example rather than a general statement.", "Medium"),
                        q("Are you willing to work in a team?", "Explain how you contribute, communicate and take responsibility in a team.", "Support your answer with a project or academic example.", "Easy"),
                        q("What motivates you?", "Mention meaningful work, solving problems and continuous learning if these are genuine motivators.", "Keep your response authentic.", "Easy")
                    ])
                ]
            }
        ]
    },

    {
        name: "HCLTech",
        description: "Placement preparation for HCLTech aptitude, technical assessment and interviews.",
        rounds: [
            {
                name: "Round 1 - Aptitude Assessment",
                description: "Quantitative, logical and verbal reasoning practice.",
                topics: [
                    topic("Quantitative", [
                        q("Find 12% of 500.", "60", "500 × 12 / 100 = 60.", "Easy"),
                        q("A sum of ₹1000 becomes ₹1100 after one year at simple interest. Find the rate.", "10%", "Interest = 100. Rate = 100 / 1000 × 100 = 10%.", "Easy"),
                        q("Find the average of 12, 18, 24 and 30.", "21", "Sum = 84. Average = 84 / 4 = 21.", "Easy"),
                        q("A person travels 90 km at 30 km/hr. Find the time taken.", "3 hours", "Time = Distance / Speed = 90 / 30 = 3 hours.", "Easy"),
                        q("If 5 pens cost ₹50, find the cost of 8 pens.", "₹80", "One pen costs ₹10. Eight pens cost ₹80.", "Easy")
                    ]),
                    topic("Logical", [
                        q("Find the next term: 7, 14, 21, 28, ?", "35", "Each term increases by 7.", "Easy"),
                        q("If APPLE is coded as BQQMF, how is MANGO coded?", "NBOHP", "Each letter is shifted forward by one position.", "Easy"),
                        q("Find the odd one out: 2, 3, 5, 9, 11.", "9", "All the others are prime numbers.", "Easy"),
                        q("If yesterday was Friday, what day is tomorrow?", "Sunday", "Today is Saturday, so tomorrow is Sunday.", "Easy"),
                        q("A is older than B, and B is older than C. Who is youngest?", "C", "The order from oldest to youngest is A, B, C.", "Easy")
                    ]),
                    topic("Verbal", [
                        q("Choose the synonym of 'Assist'.", "Help", "Assist means to help or support.", "Easy"),
                        q("Choose the antonym of 'Victory'.", "Defeat", "Defeat is the opposite of victory.", "Easy"),
                        q("Fill in the blank: I have lived here ___ 2020.", "since", "Use 'since' with a starting point in time.", "Easy"),
                        q("Choose the correct sentence.", "They were playing cricket.", "The past continuous tense uses were + verb-ing for plural subjects.", "Easy"),
                        q("What does 'A piece of cake' mean?", "Something very easy", "This idiom describes a task that is simple to do.", "Easy")
                    ])
                ]
            },
            {
                name: "Round 2 - Technical Assessment",
                description: "Programming fundamentals, pseudocode, coding and computer fundamentals.",
                topics: [
                    topic("Programming Fundamentals", [
                        q("What is a variable?", "A named reference used to store or access a value.", "Variables allow programs to work with data.", "Easy"),
                        q("What is the difference between break and continue?", "break exits the loop; continue skips to the next iteration.", "They change loop execution in different ways.", "Easy"),
                        q("What is an infinite loop?", "A loop that does not terminate under its current conditions.", "It can happen when the loop condition never becomes false.", "Easy"),
                        q("What is a parameter?", "A variable listed in a function definition that receives an argument.", "Arguments are the values supplied when calling a function.", "Easy"),
                        q("What is debugging?", "Finding and fixing errors in a program.", "Debugging can involve logs, breakpoints and test cases.", "Easy")
                    ]),
                    topic("Pseudocode", [
                        q("What is an algorithm?", "A finite sequence of steps to solve a problem.", "A good algorithm has clear steps and terminates.", "Easy"),
                        q("What does a counter variable do in a loop?", "Tracks the number of iterations or occurrences.", "A counter is often incremented during each iteration.", "Easy"),
                        q("What is the output of setting total = 0 and adding 1, 2 and 3 to it?", "6", "Total = 0 + 1 + 2 + 3 = 6.", "Easy"),
                        q("What does a nested loop mean?", "A loop placed inside another loop.", "The inner loop executes as part of each outer-loop iteration.", "Easy"),
                        q("What is the purpose of a return statement?", "To end a function and optionally send a value back to its caller.", "The returned value can be stored or used by the calling code.", "Easy")
                    ]),
                    topic("Coding Problems", [
                        q("Write Python code to check whether a number is even or odd.", "Even or Odd", "A number is even if its remainder after division by 2 is zero.", "Easy", `n = int(input())

if n % 2 == 0:
    print("Even")
else:
    print("Odd")`),
                        q("Write Python code to find the smallest element in a list.", "Minimum element", "Traverse the list and update the minimum when a smaller value is found.", "Easy", `arr = list(map(int, input().split()))
smallest = arr[0]

for x in arr:
    if x < smallest:
        smallest = x

print(smallest)`),
                        q("Write Python code to count the number of digits in a positive integer.", "Digit count", "Repeatedly divide the number by 10 and count the divisions.", "Easy", `n = int(input())

if n == 0:
    print(1)
else:
    count = 0
    while n > 0:
        count += 1
        n //= 10
    print(count)`),
                        q("Write Python code to find common elements in two lists.", "Common elements", "Convert one list to a set and check membership while traversing the other list.", "Medium", `a = [1, 2, 3, 4]
b = [3, 4, 5, 6]

b_set = set(b)
common = []

for x in a:
    if x in b_set and x not in common:
        common.append(x)

print(common)`),
                        q("What is the time complexity of reversing an array of n elements?", "O(n)", "Each element is visited or swapped a constant number of times.", "Easy")
                    ]),
                    topic("Computer Fundamentals", [
                        q("What is CPU?", "Central Processing Unit.", "The CPU executes instructions and performs processing operations.", "Easy"),
                        q("What is an operating system?", "Software that manages computer hardware and provides services to applications.", "Examples include Windows, Linux and macOS.", "Easy"),
                        q("What is the full form of URL?", "Uniform Resource Locator.", "A URL identifies the location of a resource on a network.", "Easy"),
                        q("What is cache memory?", "Small, fast memory that stores frequently used data and instructions.", "It reduces average access time to slower memory.", "Medium"),
                        q("What is the binary representation of decimal 10?", "1010", "10 = 8 + 2, which is 1010 in binary.", "Easy")
                    ])
                ]
            },
            {
                name: "Round 3 - Technical Interview",
                description: "Programming, OOP, databases, data structures and project discussion.",
                topics: [
                    topic("Python", [
                        q("What are Python's built-in numeric types?", "int, float and complex.", "These represent integer, floating-point and complex numbers.", "Easy"),
                        q("What is the difference between local and global variables?", "A local variable belongs to a function scope; a global variable is defined at module scope.", "Scope determines where a variable can be accessed.", "Easy"),
                        q("What does the pass statement do?", "It acts as a placeholder that performs no operation.", "It is useful when a statement is syntactically required but not yet implemented.", "Easy"),
                        q("What is a module in Python?", "A Python file containing reusable code.", "Modules can define functions, classes and variables.", "Easy"),
                        q("What is the difference between remove() and pop() in a list?", "remove deletes by value; pop deletes by index and returns the removed item.", "pop() without an index removes the last item.", "Medium")
                    ]),
                    topic("Java", [
                        q("Is Java a purely object-oriented language?", "No", "Java includes primitive types such as int, char and boolean.", "Medium"),
                        q("What is a package in Java?", "A namespace used to organize related classes and interfaces.", "Packages help structure code and avoid naming conflicts.", "Easy"),
                        q("What is the purpose of the static keyword?", "It makes a member belong to the class rather than a particular instance.", "Static fields and methods can be accessed through the class.", "Medium"),
                        q("What is garbage collection?", "Automatic reclamation of memory occupied by objects that are no longer reachable.", "The JVM manages heap memory and garbage collection.", "Easy"),
                        q("What is the difference between == and equals() in Java?", "For objects, == compares references; equals() can compare logical content if implemented accordingly.", "String's equals() compares character content.", "Medium")
                    ]),
                    topic("OOP", [
                        q("What is a class?", "A blueprint for creating objects.", "A class defines attributes and behavior.", "Easy"),
                        q("What is an object?", "An instance of a class.", "An object has state and behavior.", "Easy"),
                        q("What is data hiding?", "Restricting direct access to internal data.", "Access modifiers and encapsulation help implement data hiding.", "Easy"),
                        q("Can a subclass inherit private members directly in Java?", "Private members are not directly accessible by subclasses.", "They still belong to the superclass object, but subclass code cannot access them directly.", "Medium"),
                        q("What is runtime polymorphism?", "Choosing an overridden method implementation at runtime based on the actual object.", "Dynamic method dispatch supports runtime polymorphism.", "Medium")
                    ]),
                    topic("DBMS and SQL", [
                        q("What is a schema?", "The logical structure or definition of a database.", "A schema describes database objects such as tables and relationships.", "Easy"),
                        q("What is a unique constraint?", "A constraint that prevents duplicate values in the constrained column or column combination.", "NULL handling can vary by database system.", "Medium"),
                        q("What is an INNER JOIN?", "A join that returns rows with matching values in both tables.", "Rows without a match are excluded.", "Easy"),
                        q("Write an SQL query to retrieve the top five highest salaries.", "SELECT salary FROM employees ORDER BY salary DESC LIMIT 5;", "Sort salaries in descending order and limit the result to five rows. LIMIT syntax varies by database.", "Medium", `SELECT salary
FROM employees
ORDER BY salary DESC
LIMIT 5;`),
                        q("What is a stored procedure?", "A named collection of SQL statements stored in the database.", "Stored procedures can encapsulate reusable database operations.", "Medium")
                    ]),
                    topic("Data Structures", [
                        q("What is the time complexity of inserting at the beginning of a linked list?", "O(1)", "Create a new node and update the head reference.", "Medium"),
                        q("What is a circular queue?", "A queue in which the last position connects back to the first position.", "It reuses array positions by wrapping around.", "Easy"),
                        q("What is the difference between a stack and a queue?", "Stack uses LIFO; queue uses FIFO.", "They differ in the order elements are removed.", "Easy"),
                        q("What is the height of a balanced binary search tree in terms of n?", "O(log n)", "Balancing keeps the height proportional to the logarithm of the number of nodes.", "Medium"),
                        q("What is a trie?", "A tree-like data structure used to store strings by their prefixes.", "Tries are useful for prefix search and autocomplete.", "Medium")
                    ]),
                    topic("Project Discussion", [
                        q("What is the frontend responsible for in a MERN application?", "Displaying the user interface and handling user interactions.", "React commonly manages the client-side interface and communicates with backend APIs.", "Easy"),
                        q("What is the role of Express.js?", "It provides routing and middleware capabilities for Node.js applications.", "Express helps build HTTP APIs and web servers.", "Easy"),
                        q("How does a frontend communicate with a backend?", "By sending HTTP requests to backend API endpoints.", "The backend processes requests and returns responses, commonly in JSON.", "Easy"),
                        q("What is JWT used for?", "Representing claims in a signed token, commonly used in authentication systems.", "A server can verify a token before allowing access to protected routes.", "Medium"),
                        q("How do you verify that a feature works correctly?", "Test normal cases, edge cases, invalid input and integration with related modules.", "Testing should cover expected behavior and failure conditions.", "Medium")
                    ])
                ]
            },
            {
                name: "Round 4 - HR Interview",
                description: "Personal, behavioural and career-related interview preparation.",
                topics: [
                    topic("HR Interview Questions", [
                        q("Tell me about yourself.", "Introduce your education, technical skills, project experience and career objective.", "Keep the answer brief, structured and relevant.", "Easy"),
                        q("Why do you want to join HCLTech?", "Explain how the role, technology and learning opportunities fit your career goals.", "Use a genuine reason connected to the position.", "Medium"),
                        q("What are your short-term goals?", "Describe a realistic goal such as improving technical skills and contributing effectively in the role.", "Keep the answer achievable and relevant.", "Easy"),
                        q("How do you respond to failure?", "Understand what went wrong, learn from it and change your approach.", "Give a real example if possible.", "Easy"),
                        q("How do you prioritize multiple tasks?", "Consider deadlines and importance, break tasks into steps and track progress.", "Communicate early when priorities conflict.", "Easy"),
                        q("Do you have any questions for us?", "Ask about the role, team expectations, learning opportunities or technologies used.", "Prepare one or two thoughtful questions.", "Easy")
                    ])
                ]
            }
        ]
    }
];

module.exports = companies;
