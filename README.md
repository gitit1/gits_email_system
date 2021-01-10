# gitit-regev-mail-system
### http://www.email_system.gititregev.com/

___Demo user:___

username: dan@test.com 

password: 123456

#
**This is An Email Syastem Currently Without a DB (for now based on json file).**

**Written with React Hook ,Redax and NodeJS.**

 ### The Basic Features Are:
 - get all emails
 - write new email
 - delete email by id
 - authentication
 
 
# Current TODO list:

#### General - Design/Code Cleaness: 
- [X] write message - design page
- [X] read message - design page
- [X] get all message - better design (add hour, make list look better...)
- [X] delete message
- [X] server- logic and routing -seperate


#### General - Funcionality
- [X] write message logic - including validation
- [X] read message logic
- [X] delete message logic
- [X] fake login - add validation

#### General - Other
- [X] fix responsive
- [X] fix url (put in axios handler), to upload it to site
- [X] Fix Index page design (add an email photo and some nice text)
- [X] fix validation of new email
- [X] check errors (s+c: login, validation, send email)
- [X] add promp for delete
- [X] Add Auth logic
- [X] save session in local storage
- [X] clean code (check for errors, better coding, no console.log , no notes)


- [] loader
- [X] add handle on show email if rendering the page without props
- [X] search in mail logic
- [] add DB (firebase)
- [] Add folders system
- [] delete couple of emails toghethere (mark)
- [] multiful recievers
- [] give the user control over font-size/color/font-width
- [] read/ unread emails
- [] animation to open/close drawer

#### branch - Compose Email page features:
- [X] design page
- [X] client logic - form validation , send to server, get response, error if didnt send , clean form when coming back
- [X] server logic

### branch -Other Important: 
- [X] fix responsive 

#### branch -Manage emails page features:
- [X] make fake login work
- [X] make burger icon work
- [X] make routing and change showed data according to it work (inbox/sent emails)
- [X] make delete message work
- [X] make show full message work (new page)
