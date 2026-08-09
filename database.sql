Drop database if exist gaming_database;
create database gaming_database;
use gaming_database;



create table gamer_accounts(

account_id int primary key,

firstname varchar(20) not null,

last_name  varchar(20) not null,

username varchar (40) not null unique,

password varchar(8) not null,

birth_date  Date,

sex ENUM('Male','Female', 'Other')

);



create table_games(

game_id varchar (30) primary key,

name  varchar (30)

game_price double (30),

foreign key (profile_id) references gamer_profile(profile_id)

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


insert into gamer_accounts(001,'Chris','Hammel','chammel','password','2015-08-09','Male');
insert into gamer_accounts(002,'Josh','Smith','jsmith','password','2018-07-10','Male');
insert into gamer_accounts(003,'Lisa','Jones','ljones','password','2014-06-10','Male');


insert into table_games('ABC123','Mine Craft',35.00);
insert into table_games('ABC124','Call of Duty',40.00);
insert into table_games('ABC125','God of WAR Saga',60.00);


insert into gamer_profiles('BCE123',001,'ABC124','2025-08-09');
insert into gamer_profiles('BCE124',002,'ABC123','2026-01-09');
insert into gamer_profiles('BCE125',003,'ABC125','2024-03-8');

insert into gamer_subscriptions('DEA5567',001,'Premium','2025-10-09','2026-10-09',True);
insert into gamer_subscriptions('DEA5568',002,'Premium','2026-01-09','2027-01-09',True);
insert into gamer_subscriptions('DEA5569',003,'Premium','2026-03-08','2026-03-08',True);




