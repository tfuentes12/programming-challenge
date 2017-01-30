# programming-challenge

### This app is part of an internship programming challenge by Yiftee. The instructions were to:

1. Create a Single Page app where a user can compose a message and
add one recipient (input fields: name, email, sms).
2. Add a submit button to your application.
3. Disable send button unless all fields are valid (use angularJS form validation).
Validation requirements:
  * Message: max 140 characters
  * name: required
  * email and/or sms must be provided
  * email (if provided) must be valid
  * sms (if provided) must be 10 or 11 digits long
4. Add autocomplete to any of the recipient’s input fields, allowing the user to choose a recipient that is already in their database.
5. Have the submit button created in step #2 send the message to the recipient
6. Show success message if the POST request from step #5 is successful.

*As a bonus, templates for the messages were to be added to the app.*

### Results:


Desktop View

![Desktop View](https://github.com/tfuentes12/programming-challenge/blob/master/screenshots/desktop_view.png)


Message Templates

![Message Templates](https://github.com/tfuentes12/programming-challenge/blob/master/screenshots/message_templates.png)


Mobile View (Responsiveness)

![Mobile View](https://github.com/tfuentes12/programming-challenge/blob/master/screenshots/mobile_view.png)


Message Templates (in Mobile View)

![Menu - Message Templates](https://github.com/tfuentes12/programming-challenge/blob/master/screenshots/menu_mobile_view.png)


### Runnign the app

In order to run the app, you will need **npm** and **live-server**. Clone this repository and through the terminal follow the path to the **material-start** folder. Once there, run **live-server**, and on the browser please click on **app** folder. The app should start immediately.
