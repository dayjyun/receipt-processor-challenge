## How To Run



## Notes

Inside of data.js, I commented out an alternative solution named `getPoints()` that, when called, executes the same functionality as `calculatePoints()`. The main reason why I decided to complete the assignment with `calculatePoints` is because I wanted to follow SRP, the Single Responsibility Principle. While SRP is normally dedicated for classes and modules, directing a similar approach helps return the desired output from the individual function and nothing else.

By keeping SRP in mind, I created inner functions for each point requisite to add to the point counter, and if in the future there happened to be an error in the code or needed to be modified, it would be identifiable more easily compared to a chain of statements.

Feel free to let me know if you have any questions. I had plenty of fun working on the project!
