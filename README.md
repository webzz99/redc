# GuessTheNumberPy

## Welcome to the Number Guessing Game!

Live Link to Heroku app: https://guessthenumber-7f379b9f1be6.herokuapp.com/

Live Link to Git Repo: https://github.com/webzz99/GuessTheNumberPy.git


## How to play 

Upon accessing the app, you'll be greeted with a welcome message: "Welcome to the Number Guessing Game!!!"
Guessing Range:

The game has a predefined guessing range between lower_bound and upper_bound.
For example, if lower_bound is 1 and upper_bound is 1000, you'll need to guess a number between 1 and 1000.

#### Making a Guess:
The app will prompt you to enter your guess with a message like "Guess a number between [lower_bound] and [upper_bound]:"
Enter a numerical guess within the specified range.

#### Validation:
The app validates your guess. If your input is outside the range or not a valid number, you'll be prompted to enter a valid number.

#### Feedback:
After each guess, the app will provide feedback on whether your guess is correct or not.
If your guess is correct, you'll receive a congratulatory message like "Congratulations! You guessed correctly [secret_num] in [attempts] attempts."
If your guess is too low or too high, you'll be informed accordingly.

#### Game Over:
The game continues until you either guess the correct number or exhaust all your attempts.
If you run out of attempts without guessing correctly, the app will reveal the correct number and inform you that you've lost.

#### End of Game:
The app will display a message indicating whether you won or lost.
If you wish to play again, simply refresh the page or navigate to the provided Heroku app link.

#### Enjoy the Game!
The Number Guessing Game is designed for fun and entertainment. Challenge yourself to make strategic guesses and see how quickly you can find the correct number. If you have any questions or encounter issues, feel free to reach out.
## Features 

### Existing Features 
![image](https://github.com/webzz99/GuessTheNumberPy/assets/11245795/2f48bc0f-6556-4532-82b0-eb3afabf8aa9)

#### Dynamic Welcome Message:
Upon launching the game, users are greeted with a dynamic welcome message, creating an inviting and engaging start to the game.

#### Randomly Generated Secret Number:
The game generates a random secret number within the specified range, adding an element of unpredictability and ensuring a unique experience in each round.

#### Interactive Guessing Process:
Users actively participate in the guessing process by entering their guesses. The game provides immediate feedback on whether the guess is correct or needs adjustment.

#### Limited Attempts:
To add a challenge, the game limits the number of attempts (max_attempts) users have to guess the correct number. This introduces a strategic element, encouraging thoughtful guesses.

#### Feedback on Guesses:
The game offers feedback on each guess, informing users whether their guess is correct, too low, or too high. This interactive feedback guides users in making subsequent guesses.

#### Winning Scenario:
If users guess the correct number within the allowed attempts, the game congratulates them and displays the number of attempts it took to win.

#### Losing Scenario:
If users exhaust all attempts without guessing correctly, the game reveals the correct number and informs users that they've run out of attempts.

#### Heroku App Deployment:
The game is deployed as a Heroku app, allowing easy access for users without the need for local installation. Users can play the game directly through the provided Heroku app link.

### Future Features 

#### Difficulty Levels:
Introduce different difficulty levels with varying ranges and maximum attempts, catering to players of different skill levels. For example, easy mode (1-100 with 15 attempts), medium mode (1-500 with 10 attempts), and hard mode (1-1000 with 7 attempts).

#### Leaderboard:
Implement a leaderboard to track the best-performing players based on the number of attempts or time taken to guess the correct number. This adds a competitive element and encourages friendly competition among players.

#### User Accounts:
Allow users to create accounts and log in, providing a personalized gaming experience. User accounts could store historical game data, including the number of wins, losses, and average attempts.

#### Hint System:
Implement a hint system to assist players who may be struggling. Hints could provide information about whether the correct number is higher or lower than the previous guess.

## Data Model 
The data model for the Guess the Number game includes components such as game state, player information, and game status. The game state comprises the target number, the player's attempts, and the maximum allowed attempts. Player information includes the player's name and score. Game status indicates whether the game is over and the result (win, lose, or in progress). The model is represented in a simple Python class, allowing for the initialization of a game, making guesses, and retrieving the current game status. The example usage demonstrates how the model can be employed in a basic Guess the Number game implementation.

## Testing 

#### I manually tested my code by doing the following: 

I validated my code using the PEP8 standard and successfully resolved the identified indentation errors. During the coding process, I encountered issues related to indentation, which have now been rectified, ensuring the code adheres to PEP8 standards and functions correctly.

To ensure the robustness of the code, I rigorously tested it by playing the game three times. In each iteration, I deliberately input letters and symbols to test the validation mechanism, confirmed that the code properly recognized and handled such inputs. Additionally, I tested the range validation by inputting numbers beyond the specified range. Lastly, I verified that the maximum number of attempts, set at 10, was enforced. The code successfully passed all these tests, demonstrating its reliability and adherence to the intended functionality.

### Bugs

#### Solved Bugs 
During the project development, I encountered a few indentation issues on specific lines of code. I meticulously addressed each indentation problem, ensuring that the project executed as intended. Below is an image illustrating some of the indentation errors that were identified and subsequently rectified.

![pybugs2](https://github.com/webzz99/GuessTheNumberPy/assets/11245795/92a75e81-50b2-4951-b471-595143757f1b)

#### Remaning Bugs 
* All Bugs have been resolved. 

#### Validator Testing 

* No errors where returned

![PEP8check](https://github.com/webzz99/GuessTheNumberPy/assets/11245795/26a8529b-c24f-404d-8e7d-4ffc014aebb3)

## Deployment 
This project was deployed using Code Institute's mock terminal for Heroku.

The steps for deployment are as follows:

* Fork or clone this repository
* Create a new Heroku app
* Set the buildpacks to Python and NodeJS in that order
* Link the Heroku app to the repository
* Click on Deploy

## Credits 
* This project uses the Code Institute student template for deploying the third portfolio project, the Python command-line project.
* https://www.online-ide.com/online_python_syntax_checker

