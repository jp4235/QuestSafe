Drop database if exists gaming_database;
create database gaming_database;
use gaming_database;



create table gamer_accounts(

account_id int primary key,

firstname varchar(20) not null,

last_name  varchar(20) not null,

username varchar (40) not null unique,

password_hash varchar(255) not null,

birth_date  Date,

sex ENUM('Male','Female', 'Other')

);



create table table_games(

game_id varchar (30) primary key,

name  varchar (30),

game_price DOUBLE

);



create table gamer_profiles(

profile_id varchar(30) primary key,
account_id int not null,
game_id  varchar(30),
profile_creation_date  Date,

foreign key (account_id) references gamer_accounts(account_id),
foreign key (game_id) references table_games(game_id)

);





create table gamer_subscriptions(

subscription_id varchar(20) primary key,

account_id int not null,

plan  varchar(10),

start  Date,

end    Date,

active_subscription Boolean NOT NULL DEFAULT True,

foreign key (account_id) references gamer_accounts(account_id)

);


insert into gamer_accounts values(001,'Chris','Hammel','chammel',SHA2('password',256),'2015-08-09','Male');
insert into gamer_accounts values(002,'Josh','Smith','jsmith',SHA2('password',256),'2018-07-10','Male');
insert into gamer_accounts values (003,'Lisa','Jones','ljones',SHA2('password',256),'2014-06-10','Female');


insert into table_games values ('ABC123','Mine Craft',35.00);
insert into table_games values ('ABC124','Call of Duty',40.00);
insert into table_games values ('ABC125','God of WAR Saga',60.00);


insert into gamer_profiles values ('BCE123',001,'ABC124','2025-08-09');
insert into gamer_profiles values ('BCE124',002,'ABC123','2026-01-09');
insert into gamer_profiles values ('BCE125',003,'ABC125','2024-03-8');

insert into gamer_subscriptions values ('DEA5567',001,'Premium','2025-10-09','2026-10-09',True);
insert into gamer_subscriptions values ('DEA5568',002,'Premium','2026-01-09','2027-01-09',True);
insert into gamer_subscriptions values ('DEA5569',003,'Premium','2026-03-08','2026-03-08',True);




