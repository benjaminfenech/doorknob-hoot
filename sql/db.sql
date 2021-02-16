CREATE USER IF NOT EXISTS 'a2guest'@'localhost' IDENTIFIED BY 'password';

DROP DATABASE IF EXISTS ITECH3108_30318101_A2;
CREATE DATABASE ITECH3108_30318101_A2;

GRANT SELECT,INSERT,UPDATE,DELETE ON ITECH3108_30318101_A2.* TO 'a2guest'@'localhost';

USE ITECH3108_30318101_A2;

CREATE TABLE doorknobpost (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT "Anonymous",
    text VARCHAR(500) NOT NULL,
    post_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    likes INT DEFAULT 0,
    reply_to INT NULL,
    FOREIGN KEY (reply_to) REFERENCES DoorknobPost(id)
);

INSERT INTO DoorknobPost (name, text, likes) VALUES ("user30318101", "I love the cold feel of a brass doorknob, nothing beats it!", 24);
INSERT INTO DoorknobPost (text, reply_to, likes) VALUES ("I do have to agree, I look forward to the next day knowing I'll be able to touch a cold doorknob in the morning!", 1, -24);
INSERT INTO DoorknobPost (name, text) VALUES ("knobhater22", "Honestly, I much prefer a handles, they are far easier to use than knobs.");
INSERT INTO DoorknobPost (name, text) VALUES ("vintagewoodexpert", "I like hand carved wooden doorknobs the best!!");
INSERT INTO DoorknobPost (text, reply_to) VALUES ("That's really neat! Do you make all of your doorknobs custom around the house?", 4);
INSERT INTO DoorknobPost (text, reply_to) VALUES ("Same! I love custom designed doorknobs.", 4);
INSERT INTO DoorknobPost (name, text, likes) VALUES ("knobnewbie", "Hi guys, kind of new to the doorknob scene. Does anyone have any recommendations for suppliers? Thanks!", 6);
INSERT INTO DoorknobPost (name, text, reply_to, likes) VALUES ("craftexpert76", "Hiya newbie! I usually custom make my doorknobs, but when I need to purchase premade ones I head to amazingdoorknobshop.com", 7, 14);
INSERT INTO DoorknobPost (name, text, likes) VALUES ("oldmanjeff", "Back in my day we always used knobs in the house, no handles in sight!!!1!", 43);
INSERT INTO DoorknobPost (name, text, likes) VALUES ("buddy43", "I'm so proud of this community, beautiful stuff guys", 33);
INSERT INTO DoorknobPost (name, text, likes) VALUES ("yeeter", "My doorknob is squeaky, any good way to fix it?", 43);
INSERT INTO DoorknobPost (name, text, reply_to, likes) VALUES ("craftexpert76", "Just spray a bit of WD40 in there, should clear it right up", 11, 18);