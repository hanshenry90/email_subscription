select 
min(created_at)
as 'earliest_date' from users;

select 
concat(month(min(created_at)), ' ', day(min(created_at)), ' ', year(min(created_at)))
as 'earliest_date' from users;

select * from users where created_at= (select min(created_at) from users);

select monthname(created_at) as month, count(*) as count from users
group by month(created_at);

select count(*) as 'yahoo_users' from users where email LIKE '%@yahoo.com';

select 
    case
        when email like '%gmail.com' then 'gmail'
        when email like '%yahoo.com' then 'yahoo'
        when email like '%hotmail.com' then 'hotmail'
        else 'others'
    end as 'provider',
    
count(*) as 'total_users'     
from users
group by provider
order by total_users desc;






