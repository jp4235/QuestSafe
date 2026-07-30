Drop database if exist gaming_database;
create database gaming_database;
use gaming_database;



create table gamer_accounts(

account_id int auto_increment primary key,

firstname varchar(20) not null,

last_name  varchar(20) not null,

username varchar (40) not null unique,

password varchar(8), not null,

birth_date  Date,

sex ENUM('Male,'Female', 'Other')

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

subscription_id int auto_increment primary key,

account_id int not null,

plan  varchar(10),

start  Date,

end    Date,

active_subscription Boolean NOT NULL DEFAULT True,

foreign key (account_id) references gamer_accounts(account_id)

);



