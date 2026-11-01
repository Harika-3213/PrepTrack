
const tcsRemainingRounds = [
    {
        name: "TCS",
        description: "TCS placement preparation - Coding, Technical and HR rounds",
        rounds: [
            {
                name: "Round 2 - Advanced Coding",
                description: "Placement-style coding practice. Actual pattern may vary by role and hiring drive.",
                topics: [
                    {
                        name: "Arrays",
                        description: "Array-based coding problems",
                        questions: [
                            {
                                question: "Given an array and a target, return indices of two numbers whose sum equals the target.",
                                answer: "Use a hash map.",
                                difficulty: "Easy",
                                explanation: "For each number, search for target-number in the dictionary. Example: [2,7,11,15], target=9 gives [0,1]. Time O(n), Space O(n).",
                                code: "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []"
                            },
                            {
                                question: "Find the maximum sum of a contiguous subarray.",
                                answer: "Kadane's Algorithm.",
                                difficulty: "Medium",
                                explanation: "Example: [-2,1,-3,4,-1,2,1,-5,4] gives 6 from [4,-1,2,1]. Time O(n), Space O(1).",
                                code: "def maxSubArray(nums):\n    current = best = nums[0]\n    for num in nums[1:]:\n        current = max(num, current + num)\n        best = max(best, current)\n    return best"
                            },
                            {
                                question: "Find the maximum profit from one stock transaction.",
                                answer: "Track minimum price and maximum profit.",
                                difficulty: "Easy",
                                explanation: "Example: [7,1,5,3,6,4] gives 5. Buy at 1 and sell at 6. Time O(n), Space O(1).",
                                code: "def maxProfit(prices):\n    minimum = float('inf')\n    profit = 0\n    for price in prices:\n        minimum = min(minimum, price)\n        profit = max(profit, price - minimum)\n    return profit"
                            },
                            {
                                question: "Move all zeroes to the end while maintaining the order of non-zero elements.",
                                answer: "Use two pointers.",
                                difficulty: "Easy",
                                explanation: "Example: [0,1,0,3,12] becomes [1,3,12,0,0]. Time O(n), Space O(1).",
                                code: "def moveZeroes(nums):\n    pos = 0\n    for num in nums:\n        if num != 0:\n            nums[pos] = num\n            pos += 1\n    while pos < len(nums):\n        nums[pos] = 0\n        pos += 1\n    return nums"
                            },
                            {
                                question: "Find the majority element appearing more than n/2 times.",
                                answer: "Boyer-Moore Voting Algorithm.",
                                difficulty: "Medium",
                                explanation: "Maintain a candidate and count. If the input guarantees a majority element, the final candidate is the answer. Time O(n), Space O(1).",
                                code: "def majorityElement(nums):\n    candidate = None\n    count = 0\n    for num in nums:\n        if count == 0:\n            candidate = num\n        count += 1 if num == candidate else -1\n    return candidate"
                            }
                        ]
                    },
                    {
                        name: "Strings",
                        description: "String manipulation and sliding window problems",
                        questions: [
                            {
                                question: "Check whether a given string is a palindrome.",
                                answer: "Compare the string with its reverse.",
                                difficulty: "Easy",
                                explanation: "Example: 'madam' is a palindrome. Time O(n).",
                                code: "def isPalindrome(s):\n    return s == s[::-1]"
                            },
                            {
                                question: "Check whether two strings are anagrams.",
                                answer: "Compare character frequencies.",
                                difficulty: "Easy",
                                explanation: "Example: 'listen' and 'silent' are anagrams. Sorting solution takes O(n log n).",
                                code: "def isAnagram(s, t):\n    return sorted(s) == sorted(t)"
                            },
                            {
                                question: "Find the first non-repeating character in a string.",
                                answer: "Use a frequency dictionary.",
                                difficulty: "Medium",
                                explanation: "Example: 'leetcode' returns index 0. Time O(n), Space O(k).",
                                code: "def firstUniqChar(s):\n    freq = {}\n    for ch in s:\n        freq[ch] = freq.get(ch, 0) + 1\n    for i, ch in enumerate(s):\n        if freq[ch] == 1:\n            return i\n    return -1"
                            },
                            {
                                question: "Reverse the words in a sentence.",
                                answer: "Split, reverse and join.",
                                difficulty: "Easy",
                                explanation: "Example: 'I love Python' becomes 'Python love I'. Time O(n).",
                                code: "def reverseWords(s):\n    return ' '.join(s.split()[::-1])"
                            },
                            {
                                question: "Find the length of the longest substring without repeating characters.",
                                answer: "Sliding window with a dictionary.",
                                difficulty: "Hard",
                                explanation: "Example: 'abcabcbb' gives 3 for 'abc'. Time O(n), Space O(k).",
                                code: "def lengthOfLongestSubstring(s):\n    seen = {}\n    left = best = 0\n    for right, ch in enumerate(s):\n        if ch in seen and seen[ch] >= left:\n            left = seen[ch] + 1\n        seen[ch] = right\n        best = max(best, right-left+1)\n    return best"
                            }
                        ]
                    },
                    {
                        name: "Searching and Sorting",
                        description: "Searching and sorting algorithms",
                        questions: [
                            {
                                question: "Implement binary search on a sorted array.",
                                answer: "Repeatedly divide the search range into halves.",
                                difficulty: "Easy",
                                explanation: "Example: [1,3,5,7], target=5 returns index 2. Time O(log n), Space O(1).",
                                code: "def binarySearch(nums, target):\n    left, right = 0, len(nums)-1\n    while left <= right:\n        mid = (left+right)//2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid+1\n        else:\n            right = mid-1\n    return -1"
                            },
                            {
                                question: "Find the first and last position of a target in a sorted array.",
                                answer: "Use binary search twice.",
                                difficulty: "Medium",
                                explanation: "Example: [5,7,7,8,8,10], target=8 gives [3,4]. Time O(log n).",
                                code: "def searchRange(nums, target):\n    def bound(first):\n        left, right = 0, len(nums)\n        while left < right:\n            mid = (left+right)//2\n            if nums[mid] > target or (first and nums[mid] == target):\n                right = mid\n            else:\n                left = mid+1\n        return left\n    start = bound(True)\n    end = bound(False)-1\n    if start <= end and start < len(nums) and nums[start] == target:\n        return [start,end]\n    return [-1,-1]"
                            },
                            {
                                question: "Merge two sorted arrays.",
                                answer: "Use two pointers.",
                                difficulty: "Easy",
                                explanation: "Compare current elements and append the smaller one. Time O(n+m).",
                                code: "def mergeSorted(a,b):\n    i = j = 0\n    result = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i]); i += 1\n        else:\n            result.append(b[j]); j += 1\n    result.extend(a[i:])\n    result.extend(b[j:])\n    return result"
                            },
                            {
                                question: "Sort an array containing only 0, 1 and 2.",
                                answer: "Dutch National Flag algorithm.",
                                difficulty: "Medium",
                                explanation: "Use low, mid and high pointers. Example: [2,0,1] becomes [0,1,2]. Time O(n), Space O(1).",
                                code: "def sortColors(nums):\n    low = mid = 0\n    high = len(nums)-1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1; mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n    return nums"
                            },
                            {
                                question: "Find the kth largest element in an unsorted array.",
                                answer: "Sort the array in descending order.",
                                difficulty: "Medium",
                                explanation: "Example: [3,2,1,5,6,4], k=2 gives 5. Sorting takes O(n log n).",
                                code: "def findKthLargest(nums, k):\n    nums.sort(reverse=True)\n    return nums[k-1]"
                            }
                        ]
                    },
                    {
                        name: "Hashing",
                        description: "Hash maps, sets and frequency counting",
                        questions: [
                            {
                                question: "Count the frequency of every element in an array.",
                                answer: "Use a dictionary.",
                                difficulty: "Easy",
                                explanation: "Example: [1,2,2,1] gives {1:2, 2:2}. Time O(n).",
                                code: "def frequencyCount(nums):\n    freq = {}\n    for x in nums:\n        freq[x] = freq.get(x,0)+1\n    return freq"
                            },
                            {
                                question: "Find unique common elements of two arrays.",
                                answer: "Use set intersection.",
                                difficulty: "Easy",
                                explanation: "Example: [1,2,2,3] and [2,3,4] gives [2,3].",
                                code: "def intersection(a,b):\n    return list(set(a) & set(b))"
                            },
                            {
                                question: "Find the first repeated element.",
                                answer: "Use a set to track visited elements.",
                                difficulty: "Easy",
                                explanation: "Example: [4,2,5,2,3] returns 2. Average O(n) time.",
                                code: "def firstRepeated(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return x\n        seen.add(x)\n    return -1"
                            },
                            {
                                question: "Count subarrays whose sum equals k.",
                                answer: "Use prefix sums and a frequency dictionary.",
                                difficulty: "Medium",
                                explanation: "Example: [1,1,1], k=2 gives 2. Time O(n), Space O(n).",
                                code: "def subarraySum(nums,k):\n    freq = {0:1}\n    total = count = 0\n    for x in nums:\n        total += x\n        count += freq.get(total-k,0)\n        freq[total] = freq.get(total,0)+1\n    return count"
                            },
                            {
                                question: "Group words that are anagrams.",
                                answer: "Use sorted characters as dictionary keys.",
                                difficulty: "Medium",
                                explanation: "Example: ['eat','tea','tan','ate'] groups eat, tea and ate together.",
                                code: "def groupAnagrams(words):\n    groups = {}\n    for word in words:\n        key = ''.join(sorted(word))\n        groups.setdefault(key,[]).append(word)\n    return list(groups.values())"
                            }
                        ]
                    },
                    {
                        name: "Recursion",
                        description: "Recursive functions and backtracking",
                        questions: [
                            {
                                question: "Find factorial using recursion.",
                                answer: "Multiply n by factorial(n-1).",
                                difficulty: "Easy",
                                explanation: "Base case factorial(0)=1. Example: factorial(5)=120. Time O(n), stack space O(n).",
                                code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)"
                            },
                            {
                                question: "Find the nth Fibonacci number recursively.",
                                answer: "Add Fibonacci(n-1) and Fibonacci(n-2).",
                                difficulty: "Easy",
                                explanation: "Base cases are fib(0)=0 and fib(1)=1. Naive recursion takes O(2^n) time.",
                                code: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1)+fibonacci(n-2)"
                            },
                            {
                                question: "Find the sum of digits using recursion.",
                                answer: "Add the last digit to the recursive sum of remaining digits.",
                                difficulty: "Easy",
                                explanation: "Example: 1234 gives 10. Time O(d), where d is number of digits.",
                                code: "def sumDigits(n):\n    if n == 0:\n        return 0\n    return n%10 + sumDigits(n//10)"
                            },
                            {
                                question: "Generate all subsets of an array.",
                                answer: "Use include/exclude recursion.",
                                difficulty: "Medium",
                                explanation: "For [1,2], subsets are [], [1], [2], [1,2]. Time O(n*2^n).",
                                code: "def subsets(nums):\n    result = []\n    def backtrack(i,path):\n        if i == len(nums):\n            result.append(path[:]); return\n        backtrack(i+1,path)\n        path.append(nums[i])\n        backtrack(i+1,path)\n        path.pop()\n    backtrack(0,[])\n    return result"
                            },
                            {
                                question: "Solve Tower of Hanoi for n disks.",
                                answer: "Move n-1 disks to auxiliary, move largest, then move n-1 to destination.",
                                difficulty: "Hard",
                                explanation: "Minimum moves = 2^n-1. Time O(2^n), stack space O(n).",
                                code: "def hanoi(n,src,aux,dst):\n    if n == 1:\n        print(src,'->',dst); return\n    hanoi(n-1,src,dst,aux)\n    print(src,'->',dst)\n    hanoi(n-1,aux,src,dst)"
                            }
                        ]
                    },
                    {
                        name: "Dynamic Programming",
                        description: "Memoization and tabulation problems",
                        questions: [
                            {
                                question: "Find Fibonacci(n) using dynamic programming.",
                                answer: "Store previously calculated values.",
                                difficulty: "Easy",
                                explanation: "For n=6, result is 8. Time O(n), Space O(n).",
                                code: "def fib(n):\n    if n <= 1: return n\n    dp = [0]*(n+1)\n    dp[1] = 1\n    for i in range(2,n+1):\n        dp[i] = dp[i-1]+dp[i-2]\n    return dp[n]"
                            },
                            {
                                question: "Find the minimum coins needed to make an amount.",
                                answer: "Use bottom-up coin change DP.",
                                difficulty: "Medium",
                                explanation: "coins=[1,2,5], amount=11 gives 3 coins. Time O(amount*number of coins).",
                                code: "def coinChange(coins,amount):\n    dp = [amount+1]*(amount+1)\n    dp[0] = 0\n    for x in range(1,amount+1):\n        for c in coins:\n            if c <= x:\n                dp[x] = min(dp[x],dp[x-c]+1)\n    return dp[amount] if dp[amount] <= amount else -1"
                            },
                            {
                                question: "Find the length of the longest increasing subsequence.",
                                answer: "Use DP for the best subsequence ending at each index.",
                                difficulty: "Medium",
                                explanation: "[10,9,2,5,3,7,101,18] gives length 4. Time O(n^2), Space O(n).",
                                code: "def lengthOfLIS(nums):\n    if not nums: return 0\n    dp = [1]*len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i],dp[j]+1)\n    return max(dp)"
                            },
                            {
                                question: "Find the maximum value in 0/1 Knapsack.",
                                answer: "Use a one-dimensional DP array updated backwards.",
                                difficulty: "Hard",
                                explanation: "Each item can be selected once. Time O(n*capacity), Space O(capacity).",
                                code: "def knapsack(weights,values,capacity):\n    dp = [0]*(capacity+1)\n    for i in range(len(weights)):\n        for w in range(capacity,weights[i]-1,-1):\n            dp[w] = max(dp[w],values[i]+dp[w-weights[i]])\n    return dp[capacity]"
                            },
                            {
                                question: "Find edit distance between two strings.",
                                answer: "Use dynamic programming for insert, delete and replace.",
                                difficulty: "Hard",
                                explanation: "Converting 'horse' to 'ros' requires 3 operations. Time and space O(m*n).",
                                code: "def minDistance(a,b):\n    m,n = len(a),len(b)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0] = i\n    for j in range(n+1): dp[0][j] = j\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if a[i-1] == b[j-1]:\n                dp[i][j] = dp[i-1][j-1]\n            else:\n                dp[i][j] = 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])\n    return dp[m][n]"
                            }
                        ]
                    },
                    {
                        name: "Greedy Algorithms",
                        description: "Greedy optimization and interval problems",
                        questions: [
                            {
                                question: "Select the maximum number of non-overlapping activities.",
                                answer: "Sort activities by finishing time.",
                                difficulty: "Medium",
                                explanation: "Choose each activity starting after the previous selected activity ends. Time O(n log n).",
                                code: "def activitySelection(items):\n    items.sort(key=lambda x:x[1])\n    result=[]; end=float('-inf')\n    for s,e in items:\n        if s>=end:\n            result.append((s,e)); end=e\n    return result"
                            },
                            {
                                question: "Find the minimum platforms required for trains.",
                                answer: "Sort arrivals and departures and use two pointers.",
                                difficulty: "Medium",
                                explanation: "Track simultaneous trains and return the maximum count. Time O(n log n).",
                                code: "def minPlatforms(arr,dep):\n    arr.sort(); dep.sort()\n    i=j=0; current=best=0\n    while i<len(arr):\n        if arr[i]<=dep[j]:\n            current+=1; best=max(best,current); i+=1\n        else:\n            current-=1; j+=1\n    return best"
                            },
                            {
                                question: "Make an amount using standard coin denominations where greedy choice is valid.",
                                answer: "Repeatedly choose the largest denomination.",
                                difficulty: "Easy",
                                explanation: "For [25,10,5,1] and 63, choose 25,25,10,1,1,1. Greedy is not valid for every coin system.",
                                code: "def minCoins(coins,amount):\n    result=[]\n    for c in sorted(coins,reverse=True):\n        count=amount//c\n        result += [c]*count\n        amount %= c\n    return result if amount==0 else []"
                            },
                            {
                                question: "Schedule jobs with deadlines and profits to maximize profit.",
                                answer: "Sort jobs by profit and place each in the latest free slot.",
                                difficulty: "Hard",
                                explanation: "Each job takes one time unit. Greedily schedule high-profit jobs before their deadlines.",
                                code: "def jobScheduling(jobs):\n    jobs.sort(key=lambda x:x[2],reverse=True)\n    slots=[False]*(max((j[1] for j in jobs),default=0)+1)\n    count=profit=0\n    for _,deadline,p in jobs:\n        for s in range(min(deadline,len(slots)-1),0,-1):\n            if not slots[s]:\n                slots[s]=True; count+=1; profit+=p; break\n    return count,profit"
                            },
                            {
                                question: "Find the minimum arrows needed to burst all overlapping balloons.",
                                answer: "Sort intervals by their ending coordinate.",
                                difficulty: "Medium",
                                explanation: "Place an arrow at the earliest end and reuse it for overlapping intervals. Time O(n log n).",
                                code: "def findMinArrowShots(points):\n    if not points: return 0\n    points.sort(key=lambda x:x[1])\n    arrows=1; end=points[0][1]\n    for start,finish in points[1:]:\n        if start>end:\n            arrows+=1; end=finish\n    return arrows"
                            }
                        ]
                    },
                    {
                        name: "Number Theory",
                        description: "Prime numbers, GCD, LCM and modular arithmetic",
                        questions: [
                            {
                                question: "Check whether a number is prime.",
                                answer: "Check divisibility up to square root of n.",
                                difficulty: "Easy",
                                explanation: "29 is prime; 21 is not. Time O(sqrt(n)).",
                                code: "def isPrime(n):\n    if n<2: return False\n    for i in range(2,int(n**0.5)+1):\n        if n%i==0: return False\n    return True"
                            },
                            {
                                question: "Find GCD of two numbers.",
                                answer: "Use Euclidean algorithm.",
                                difficulty: "Easy",
                                explanation: "gcd(48,18)=6. Time O(log(min(a,b))).",
                                code: "def gcd(a,b):\n    while b:\n        a,b=b,a%b\n    return abs(a)"
                            },
                            {
                                question: "Find LCM of two numbers.",
                                answer: "Use abs(a*b)//GCD(a,b).",
                                difficulty: "Easy",
                                explanation: "LCM(12,18)=36. If either number is zero, return zero.",
                                code: "def lcm(a,b):\n    import math\n    if a==0 or b==0: return 0\n    return abs(a*b)//math.gcd(a,b)"
                            },
                            {
                                question: "Count prime numbers smaller than n.",
                                answer: "Use Sieve of Eratosthenes.",
                                difficulty: "Medium",
                                explanation: "n=10 gives 4 primes: 2,3,5,7. Time O(n log log n), Space O(n).",
                                code: "def countPrimes(n):\n    if n<=2: return 0\n    prime=[True]*n\n    prime[0]=prime[1]=False\n    for i in range(2,int(n**0.5)+1):\n        if prime[i]:\n            for j in range(i*i,n,i):\n                prime[j]=False\n    return sum(prime)"
                            },
                            {
                                question: "Calculate a raised to power b modulo m.",
                                answer: "Use binary exponentiation.",
                                difficulty: "Medium",
                                explanation: "Repeatedly square the base and halve the exponent. Time O(log b).",
                                code: "def modPower(a,b,m):\n    result=1\n    a%=m\n    while b>0:\n        if b%2: result=(result*a)%m\n        a=(a*a)%m\n        b//=2\n    return result"
                            }
                        ]
                    },
                    {
                        name: "Problem Solving",
                        description: "Mixed placement-style coding challenges",
                        questions: [
                            {
                                question: "Find the maximum product of any two elements.",
                                answer: "Compare products of two largest and two smallest elements.",
                                difficulty: "Medium",
                                explanation: "[-10,-3,2,5] gives 30. Sorting approach O(n log n).",
                                code: "def maxProduct(nums):\n    nums=sorted(nums)\n    return max(nums[0]*nums[1],nums[-1]*nums[-2])"
                            },
                            {
                                question: "Find the equilibrium index of an array.",
                                answer: "Use total sum and running left sum.",
                                difficulty: "Easy",
                                explanation: "[1,3,5,2,2] returns index 2 because left and right sums are both 4. Time O(n).",
                                code: "def equilibriumIndex(nums):\n    total=sum(nums); left=0\n    for i,x in enumerate(nums):\n        if left==total-left-x: return i\n        left+=x\n    return -1"
                            },
                            {
                                question: "Find the longest consecutive sequence.",
                                answer: "Use a set and expand from sequence beginnings.",
                                difficulty: "Medium",
                                explanation: "[100,4,200,1,3,2] gives length 4. Average O(n) time.",
                                code: "def longestConsecutive(nums):\n    values=set(nums); best=0\n    for x in values:\n        if x-1 not in values:\n            y=x\n            while y in values: y+=1\n            best=max(best,y-x)\n    return best"
                            },
                            {
                                question: "Find the minimum jumps to reach the last index.",
                                answer: "Use greedy range expansion.",
                                difficulty: "Hard",
                                explanation: "[2,3,1,1,4] gives 2 jumps. O(n) time, O(1) space. Assumes the end is reachable.",
                                code: "def jump(nums):\n    if len(nums)<=1: return 0\n    jumps=end=far=0\n    for i in range(len(nums)-1):\n        far=max(far,i+nums[i])\n        if i==end:\n            jumps+=1; end=far\n    return jumps"
                            },
                            {
                                question: "Find the minimum meeting rooms required.",
                                answer: "Sort start and end times and use two pointers.",
                                difficulty: "Medium",
                                explanation: "[[0,30],[5,10],[15,20]] requires 2 rooms. Time O(n log n).",
                                code: "def minMeetingRooms(intervals):\n    if not intervals: return 0\n    starts=sorted(x[0] for x in intervals)\n    ends=sorted(x[1] for x in intervals)\n    i=j=rooms=best=0\n    while i<len(starts):\n        if starts[i]<ends[j]:\n            rooms+=1; best=max(best,rooms); i+=1\n        else:\n            rooms-=1; j+=1\n    return best"
                            }
                        ]
                    }
                ]
            },
            {
                name: "Round 3 - Technical Interview",
                description: "Technical fundamentals and project discussion. Topics may vary by role and hiring drive.",
                topics: [
                    {
                        name: "Python",
                        description: "Python fundamentals",
                        questions: [
                            {
                                question: "What is the difference between a list and a tuple?",
                                answer: "Lists are mutable; tuples are immutable.",
                                difficulty: "Easy",
                                explanation: "A list can be modified after creation. A tuple cannot have its elements reassigned."
                            },
                            {
                                question: "What is the difference between == and is?",
                                answer: "== compares values; is compares object identity.",
                                difficulty: "Easy",
                                explanation: "Two separate lists can have equal values but be different objects."
                            },
                            {
                                question: "What is a dictionary in Python?",
                                answer: "A mutable key-value mapping.",
                                difficulty: "Easy",
                                explanation: "Dictionary keys are unique and hashable. Average lookup is O(1)."
                            },
                            {
                                question: "What is list comprehension?",
                                answer: "A concise way to create a list from an iterable.",
                                difficulty: "Easy",
                                explanation: "Example: [x*x for x in range(5)] produces [0,1,4,9,16]."
                            },
                            {
                                question: "What is the purpose of __init__?",
                                answer: "It initializes a newly created object.",
                                difficulty: "Medium",
                                explanation: "It is commonly used to assign instance attributes."
                            }
                        ]
                    },
                    {
                        name: "Java",
                        description: "Java fundamentals and JVM",
                        questions: [
                            {
                                question: "What is JVM?",
                                answer: "Java Virtual Machine executes Java bytecode.",
                                difficulty: "Easy",
                                explanation: "Java source is compiled into bytecode, which the JVM executes."
                            },
                            {
                                question: "Differentiate JDK, JRE and JVM.",
                                answer: "JDK develops, JRE runs, JVM executes bytecode.",
                                difficulty: "Easy",
                                explanation: "JDK includes development tools; JRE contains runtime libraries and JVM."
                            },
                            {
                                question: "What is method overloading?",
                                answer: "Methods have the same name but different parameter lists.",
                                difficulty: "Easy",
                                explanation: "It is compile-time polymorphism. Return type alone cannot distinguish overloads."
                            },
                            {
                                question: "Differentiate == and equals() in Java.",
                                answer: "== compares primitive values or reference identity; equals() checks logical equality when overridden.",
                                difficulty: "Medium",
                                explanation: "String overrides equals() to compare character content."
                            },
                            {
                                question: "Why is String immutable in Java?",
                                answer: "A String object's content cannot be changed after creation.",
                                difficulty: "Medium",
                                explanation: "Immutability supports safe sharing, hashing and string-pool behavior."
                            }
                        ]
                    },
                    {
                        name: "C Programming",
                        description: "C language, pointers and memory",
                        questions: [
                            {
                                question: "What is a pointer?",
                                answer: "A variable that stores the address of another object.",
                                difficulty: "Easy",
                                explanation: "& obtains an address and * dereferences a pointer."
                            },
                            {
                                question: "Differentiate malloc() and calloc().",
                                answer: "malloc allocates uninitialized memory; calloc allocates zero-initialized memory.",
                                difficulty: "Medium",
                                explanation: "Both allocate dynamically and return NULL if allocation fails."
                            },
                            {
                                question: "What is a NULL pointer?",
                                answer: "A pointer that points to no valid object.",
                                difficulty: "Easy",
                                explanation: "Dereferencing a NULL pointer causes undefined behavior."
                            },
                            {
                                question: "Differentiate ++i and i++.",
                                answer: "Prefix increments before yielding; postfix yields the old value then increments.",
                                difficulty: "Medium",
                                explanation: "As standalone statements both increment the variable once."
                            },
                            {
                                question: "What is a dangling pointer?",
                                answer: "A pointer referring to memory whose lifetime has ended.",
                                difficulty: "Medium",
                                explanation: "Using a dangling pointer is unsafe. Clear pointers after freeing when appropriate."
                            }
                        ]
                    },
                    {
                        name: "OOP Concepts",
                        description: "Object-oriented programming principles",
                        questions: [
                            {
                                question: "What are the four main principles of OOP?",
                                answer: "Encapsulation, abstraction, inheritance and polymorphism.",
                                difficulty: "Easy",
                                explanation: "These principles help organize code around objects and reusable behavior."
                            },
                            {
                                question: "What is encapsulation?",
                                answer: "Bundling data and methods while controlling access.",
                                difficulty: "Easy",
                                explanation: "Private fields with public methods are a common example."
                            },
                            {
                                question: "What is abstraction?",
                                answer: "Showing essential behavior while hiding implementation details.",
                                difficulty: "Easy",
                                explanation: "An interface can expose operations without revealing internal implementation."
                            },
                            {
                                question: "What is inheritance?",
                                answer: "A class derives and reuses features from another class.",
                                difficulty: "Easy",
                                explanation: "It models an is-a relationship and supports method overriding."
                            },
                            {
                                question: "What is polymorphism?",
                                answer: "One interface can represent different underlying forms of behavior.",
                                difficulty: "Medium",
                                explanation: "Overriding is commonly runtime polymorphism; overloading is commonly compile-time polymorphism."
                            }
                        ]
                    },
                    {
                        name: "DBMS",
                        description: "Database concepts, keys and transactions",
                        questions: [
                            {
                                question: "What is a DBMS?",
                                answer: "Software used to define, store, retrieve and manage data.",
                                difficulty: "Easy",
                                explanation: "It provides controlled access, integrity, concurrency and recovery."
                            },
                            {
                                question: "What is a primary key?",
                                answer: "A column or column set that uniquely identifies each row and cannot be NULL.",
                                difficulty: "Easy",
                                explanation: "A table has one primary-key constraint, which may contain multiple columns."
                            },
                            {
                                question: "What is a foreign key?",
                                answer: "A column or column set referencing a candidate key in another or the same table.",
                                difficulty: "Easy",
                                explanation: "It enforces referential integrity."
                            },
                            {
                                question: "What is normalization?",
                                answer: "Organizing tables to reduce redundancy and update anomalies.",
                                difficulty: "Medium",
                                explanation: "1NF removes repeating groups, 2NF removes partial dependency, and 3NF removes transitive dependency."
                            },
                            {
                                question: "What are ACID properties?",
                                answer: "Atomicity, Consistency, Isolation and Durability.",
                                difficulty: "Medium",
                                explanation: "They describe reliable transaction behavior."
                            }
                        ]
                    },
                    {
                        name: "SQL",
                        description: "SQL queries, joins and grouping",
                        questions: [
                            {
                                question: "Differentiate WHERE and HAVING.",
                                answer: "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
                                difficulty: "Easy",
                                explanation: "HAVING is commonly used with GROUP BY and aggregate conditions."
                            },
                            {
                                question: "What is INNER JOIN?",
                                answer: "It returns rows with matching join keys in both tables.",
                                difficulty: "Easy",
                                explanation: "Non-matching rows are excluded."
                            },
                            {
                                question: "What is LEFT JOIN?",
                                answer: "It returns all left-table rows and matching right-table rows.",
                                difficulty: "Easy",
                                explanation: "Unmatched right-side columns are returned as NULL."
                            },
                            {
                                question: "Write a query to find the second-highest distinct salary.",
                                answer: "SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);",
                                difficulty: "Medium",
                                explanation: "The inner query finds the highest salary; the outer query finds the greatest salary below it."
                            },
                            {
                                question: "Differentiate DELETE, TRUNCATE and DROP.",
                                answer: "DELETE removes rows, TRUNCATE removes all rows, DROP removes the table object.",
                                difficulty: "Medium",
                                explanation: "Transaction and identity-reset behavior can vary by database."
                            }
                        ]
                    },
                    {
                        name: "Operating Systems",
                        description: "Processes, threads, memory and deadlocks",
                        questions: [
                            {
                                question: "Differentiate process and thread.",
                                answer: "A process has its own address space; threads in a process share resources.",
                                difficulty: "Easy",
                                explanation: "Threads have separate stacks and execution state."
                            },
                            {
                                question: "What is context switching?",
                                answer: "Saving one execution context and restoring another.",
                                difficulty: "Easy",
                                explanation: "It enables multitasking but introduces overhead."
                            },
                            {
                                question: "What are the four necessary conditions for deadlock?",
                                answer: "Mutual exclusion, hold and wait, no preemption and circular wait.",
                                difficulty: "Medium",
                                explanation: "Breaking at least one necessary condition prevents deadlock."
                            },
                            {
                                question: "What is virtual memory?",
                                answer: "A memory-management abstraction that provides virtual address spaces.",
                                difficulty: "Medium",
                                explanation: "Paging maps virtual pages to physical frames or secondary storage."
                            },
                            {
                                question: "Differentiate paging and segmentation.",
                                answer: "Paging uses fixed-size blocks; segmentation uses variable-size logical regions.",
                                difficulty: "Medium",
                                explanation: "Paging avoids external fragmentation; segmentation reflects logical program units."
                            }
                        ]
                    },
                    {
                        name: "Computer Networks",
                        description: "TCP/IP, addressing and networking protocols",
                        questions: [
                            {
                                question: "Differentiate TCP and UDP.",
                                answer: "TCP is connection-oriented and reliable; UDP is connectionless with lower overhead.",
                                difficulty: "Easy",
                                explanation: "TCP provides ordered delivery and retransmission; UDP does not guarantee them."
                            },
                            {
                                question: "What is an IP address?",
                                answer: "A logical address used to identify an interface on an IP network.",
                                difficulty: "Easy",
                                explanation: "IPv4 uses 32 bits; IPv6 uses 128 bits."
                            },
                            {
                                question: "What is DNS?",
                                answer: "A distributed naming system that maps domain names to records such as IP addresses.",
                                difficulty: "Easy",
                                explanation: "DNS commonly uses port 53 over UDP or TCP."
                            },
                            {
                                question: "What does HTTP status code 404 mean?",
                                answer: "The requested resource was not found.",
                                difficulty: "Easy",
                                explanation: "It is a client-error status code."
                            },
                            {
                                question: "Differentiate switch and router.",
                                answer: "A switch forwards frames within a LAN; a router forwards packets between networks.",
                                difficulty: "Medium",
                                explanation: "Switches commonly use MAC addresses; routers use IP routing."
                            }
                        ]
                    },
                    {
                        name: "Data Structures",
                        description: "Linear and non-linear data structures",
                        questions: [
                            {
                                question: "Differentiate stack and queue.",
                                answer: "Stack uses LIFO; queue uses FIFO.",
                                difficulty: "Easy",
                                explanation: "Stack uses push and pop; queue uses enqueue and dequeue."
                            },
                            {
                                question: "What is a linked list?",
                                answer: "A sequence of nodes containing data and link references.",
                                difficulty: "Easy",
                                explanation: "Insertion can be O(1) when the target position is already known."
                            },
                            {
                                question: "What is a binary search tree?",
                                answer: "A binary tree ordered according to a key comparison rule.",
                                difficulty: "Medium",
                                explanation: "Search is O(log n) when balanced and O(n) in the worst case."
                            },
                            {
                                question: "What is a hash table?",
                                answer: "A key-value structure using a hash function to select storage locations.",
                                difficulty: "Medium",
                                explanation: "Average lookup is O(1); collisions require handling."
                            },
                            {
                                question: "What is a graph?",
                                answer: "A set of vertices connected by edges.",
                                difficulty: "Easy",
                                explanation: "Graphs can be directed or undirected, weighted or unweighted."
                            }
                        ]
                    },
                    {
                        name: "Project Discussion",
                        description: "Project architecture, implementation and troubleshooting",
                        questions: [
                            {
                                question: "How do you explain your project in one minute?",
                                answer: "State the problem, users, key features, technology stack and your contribution.",
                                difficulty: "Easy",
                                explanation: "Keep the explanation structured and focus on the value delivered."
                            },
                            {
                                question: "Why did you choose MongoDB for a MERN project?",
                                answer: "It stores document-shaped data and integrates naturally with JavaScript applications.",
                                difficulty: "Medium",
                                explanation: "Explain your actual schema and why it fits the project; it is not always better than SQL."
                            },
                            {
                                question: "What is the role of Express in MERN?",
                                answer: "Express provides backend routing and middleware on Node.js.",
                                difficulty: "Easy",
                                explanation: "It handles API endpoints, validation, authentication middleware and responses."
                            },
                            {
                                question: "How do you protect private API routes?",
                                answer: "Verify authentication tokens in middleware and check authorization on the server.",
                                difficulty: "Medium",
                                explanation: "Never rely only on hiding frontend buttons; validate permissions on the server."
                            },
                            {
                                question: "How would you debug an API returning status 500?",
                                answer: "Inspect logs, reproduce the request, validate inputs and trace the failing operation.",
                                difficulty: "Medium",
                                explanation: "Check database connectivity, async errors and environment configuration without exposing secrets."
                            }
                        ]
                    }
                ]
            },
            {
                name: "Round 4 - HR Interview",
                description: "Behavioral and role-fit interview practice",
                topics: [
                    {
                        name: "HR Interview Questions",
                        description: "Communication, behavioral and project-related questions",
                        questions: [
                            {
                                question: "Tell me about yourself.",
                                answer: "Summarize your education, skills, projects and career goal.",
                                difficulty: "Easy",
                                explanation: "Keep it concise and relevant to the role."
                            },
                            {
                                question: "Why do you want to join TCS?",
                                answer: "Connect your interest in the role with TCS work, learning opportunities and your skills.",
                                difficulty: "Medium",
                                explanation: "Research the role and give genuine reasons rather than memorized statements."
                            },
                            {
                                question: "What are your strengths?",
                                answer: "Mention two job-relevant strengths and support each with a real example.",
                                difficulty: "Easy",
                                explanation: "Use a short example to demonstrate each strength."
                            },
                            {
                                question: "What is one weakness you are improving?",
                                answer: "Choose a genuine manageable area and explain your improvement steps.",
                                difficulty: "Medium",
                                explanation: "Avoid fake weaknesses; show self-awareness and progress."
                            },
                            {
                                question: "Explain a project you have built.",
                                answer: "Describe the problem, users, architecture, features, contribution and outcome.",
                                difficulty: "Easy",
                                explanation: "Be ready to explain your own code and technical decisions."
                            },
                            {
                                question: "What was the biggest challenge in your project?",
                                answer: "Explain the challenge, options considered, action taken and result.",
                                difficulty: "Medium",
                                explanation: "Use a real example and describe your individual contribution."
                            },
                            {
                                question: "How do you handle pressure and deadlines?",
                                answer: "Prioritize tasks, break them into steps, communicate risks and track progress.",
                                difficulty: "Medium",
                                explanation: "Give an example of how you managed a deadline."
                            },
                            {
                                question: "Are you comfortable learning a new technology?",
                                answer: "Give an example of learning an unfamiliar tool and applying it.",
                                difficulty: "Easy",
                                explanation: "Explain your learning process and result."
                            },
                            {
                                question: "How do you handle disagreement in a team?",
                                answer: "Listen, clarify the shared goal, compare evidence and agree on a practical decision.",
                                difficulty: "Medium",
                                explanation: "Show respect and collaboration."
                            },
                            {
                                question: "Where do you see yourself in five years?",
                                answer: "Describe realistic growth in technical ability, ownership and contribution.",
                                difficulty: "Easy",
                                explanation: "Keep your goals connected to professional development."
                            },
                            {
                                question: "Why should we hire you?",
                                answer: "Connect your relevant skills, learning attitude and project experience to the role.",
                                difficulty: "Medium",
                                explanation: "Give evidence instead of making unsupported claims."
                            },
                            {
                                question: "Are you willing to relocate or work in shifts?",
                                answer: "Answer honestly based on your availability and constraints.",
                                difficulty: "Easy",
                                explanation: "Do not promise something you cannot realistically do."
                            },
                            {
                                question: "How do you respond to constructive feedback?",
                                answer: "Listen, clarify expectations and apply the feedback.",
                                difficulty: "Easy",
                                explanation: "Give an example of feedback that helped you improve."
                            },
                            {
                                question: "What would you do if you did not know a technical answer?",
                                answer: "Explain what you know, state assumptions and describe how you would investigate.",
                                difficulty: "Medium",
                                explanation: "Be honest; do not bluff or invent facts."
                            },
                            {
                                question: "Do you have any questions for the interviewer?",
                                answer: "Ask about responsibilities, team expectations, onboarding or learning opportunities.",
                                difficulty: "Easy",
                                explanation: "Prepare one or two thoughtful questions about the role."
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

module.exports = tcsRemainingRounds;
