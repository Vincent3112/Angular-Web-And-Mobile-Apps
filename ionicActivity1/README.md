# Ionic application - CDs and Books


### Activity of the OpenClassroom course on ionic mobile applications.

As part of a course I took on OpenClassroom online platform, I developed an ionic-angular mobile application. It meant to store some CDs and books that could be lent to some people.

In the application the list of articles is updated in live when someone lends an article or give it back, thanks to a constantly up-to-date firebase backend.
The owner of the articles can also add some of them by filling a form stating the name, artist/author and price of the Cd/Book.

### Technical approach

To build this application I used Ionic and Angular.
All the data are stored in a firebase database.
When the status of an article is updated to lent/available, it is automatically updated in the database.
