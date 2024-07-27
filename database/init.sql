-- Create table if not exists
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- Insert a test user
INSERT INTO users (first_name, last_name, email, password, admin) 
VALUES ('Test', 'User', 'test@example.com', 'hashedpassword123', FALSE)
ON CONFLICT (email) DO NOTHING;

-- Insert an admin user
INSERT INTO users (first_name, last_name, email, password, admin) 
VALUES ('Administrator', 'User', 'admin@example.com', 'hashedpassword456', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Insert Yourself
INSERT INTO users (first_name, last_name, middle_name, email, password, admin) 
VALUES ('Parker', 'Hutcheson', 'Douglas', 'parker@example.com', '1234qwer', TRUE)
ON CONFLICT (email) DO NOTHING;

-- More Users
-- INSERT INTO users (first_name, last_name, email, password, admin) 
-- VALUES 
-- ('John', 'Doe', 'john.doe@example.com', 'hashedpassword1', FALSE),
-- ('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', FALSE),
-- ('Michael', 'Johnson', 'michael.johnson@example.com', 'hashedpassword3', FALSE),
-- ('Emily', 'Davis', 'emily.davis@example.com', 'hashedpassword4', FALSE),
-- ('Chris', 'Brown', 'chris.brown@example.com', 'hashedpassword5', FALSE),
-- ('Sarah', 'Wilson', 'sarah.wilson@example.com', 'hashedpassword6', FALSE),
-- ('David', 'Taylor', 'david.taylor@example.com', 'hashedpassword7', FALSE),
-- ('Jessica', 'Anderson', 'jessica.anderson@example.com', 'hashedpassword8', FALSE),
-- ('Daniel', 'Thomas', 'daniel.thomas@example.com', 'hashedpassword9', FALSE),
-- ('Olivia', 'Martinez', 'olivia.martinez@example.com', 'hashedpassword10', FALSE),
-- ('Matthew', 'Garcia', 'matthew.garcia@example.com', 'hashedpassword11', FALSE),
-- ('Ava', 'Hernandez', 'ava.hernandez@example.com', 'hashedpassword12', FALSE),
-- ('James', 'Moore', 'james.moore@example.com', 'hashedpassword13', FALSE),
-- ('Sophia', 'Jackson', 'sophia.jackson@example.com', 'hashedpassword14', FALSE),
-- ('Ryan', 'White', 'ryan.white@example.com', 'hashedpassword15', FALSE),
-- ('Mia', 'Lopez', 'mia.lopez@example.com', 'hashedpassword16', FALSE),
-- ('Ethan', 'Lee', 'ethan.lee@example.com', 'hashedpassword17', FALSE),
-- ('Isabella', 'Walker', 'isabella.walker@example.com', 'hashedpassword18', FALSE),
-- ('Jacob', 'Young', 'jacob.young@example.com', 'hashedpassword19', FALSE),
-- ('Charlotte', 'Allen', 'charlotte.allen@example.com', 'hashedpassword20', FALSE),
-- ('Liam', 'King', 'liam.king@example.com', 'hashedpassword21', FALSE),
-- ('Amelia', 'Scott', 'amelia.scott@example.com', 'hashedpassword22', FALSE),
-- ('Noah', 'Adams', 'noah.adams@example.com', 'hashedpassword23', FALSE),
-- ('Evelyn', 'Baker', 'evelyn.baker@example.com', 'hashedpassword24', FALSE),
-- ('Oliver', 'Gonzalez', 'oliver.gonzalez@example.com', 'hashedpassword25', FALSE),
-- ('Harper', 'Nelson', 'harper.nelson@example.com', 'hashedpassword26', FALSE),
-- ('Elijah', 'Carter', 'elijah.carter@example.com', 'hashedpassword27', FALSE),
-- ('Grace', 'Mitchell', 'grace.mitchell@example.com', 'hashedpassword28', FALSE),
-- ('Alexander', 'Perez', 'alexander.perez@example.com', 'hashedpassword29', FALSE),
-- ('Lily', 'Roberts', 'lily.roberts@example.com', 'hashedpassword30', FALSE),
-- ('Lucas', 'Turner', 'lucas.turner@example.com', 'hashedpassword31', FALSE),
-- ('Zoe', 'Phillips', 'zoe.phillips@example.com', 'hashedpassword32', FALSE),
-- ('Henry', 'Campbell', 'henry.campbell@example.com', 'hashedpassword33', FALSE),
-- ('Nora', 'Parker', 'nora.parker@example.com', 'hashedpassword34', FALSE),
-- ('Jackson', 'Evans', 'jackson.evans@example.com', 'hashedpassword35', FALSE),
-- ('Hannah', 'Edwards', 'hannah.edwards@example.com', 'hashedpassword36', FALSE),
-- ('Sebastian', 'Collins', 'sebastian.collins@example.com', 'hashedpassword37', FALSE),
-- ('Aurora', 'Stewart', 'aurora.stewart@example.com', 'hashedpassword38', FALSE),
-- ('Owen', 'Sanchez', 'owen.sanchez@example.com', 'hashedpassword39', FALSE),
-- ('Scarlett', 'Morris', 'scarlett.morris@example.com', 'hashedpassword40', FALSE),
-- ('Caleb', 'Rogers', 'caleb.rogers@example.com', 'hashedpassword41', FALSE),
-- ('Samantha', 'Reed', 'samantha.reed@example.com', 'hashedpassword42', FALSE),
-- ('Wyatt', 'Cook', 'wyatt.cook@example.com', 'hashedpassword43', FALSE),
-- ('Aria', 'Morgan', 'aria.morgan@example.com', 'hashedpassword44', FALSE),
-- ('Jack', 'Bell', 'jack.bell@example.com', 'hashedpassword45', FALSE),
-- ('Avery', 'Murphy', 'avery.murphy@example.com', 'hashedpassword46', FALSE),
-- ('Levi', 'Bailey', 'levi.bailey@example.com', 'hashedpassword47', FALSE),
-- ('Lila', 'Rivera', 'lila.rivera@example.com', 'hashedpassword48', FALSE),
-- ('Jaxon', 'Cooper', 'jaxon.cooper@example.com', 'hashedpassword49', FALSE),
-- ('Madison', 'Richardson', 'madison.richardson@example.com', 'hashedpassword50', FALSE);

-- -- Insert 50 more test users
-- INSERT INTO users (first_name, last_name, email, password, admin) 
-- VALUES 
-- ('Benjamin', 'Brooks', 'benjamin.brooks@example.com', 'hashedpassword51', FALSE),
-- ('Ella', 'Sanders', 'ella.sanders@example.com', 'hashedpassword52', FALSE),
-- ('Mason', 'Price', 'mason.price@example.com', 'hashedpassword53', FALSE),
-- ('Mila', 'Foster', 'mila.foster@example.com', 'hashedpassword54', FALSE),
-- ('Logan', 'Ross', 'logan.ross@example.com', 'hashedpassword55', FALSE),
-- ('Layla', 'Powell', 'layla.powell@example.com', 'hashedpassword56', FALSE),
-- ('Aiden', 'Russell', 'aiden.russell@example.com', 'hashedpassword57', FALSE),
-- ('Chloe', 'Sullivan', 'chloe.sullivan@example.com', 'hashedpassword58', FALSE),
-- ('Joseph', 'Barnes', 'joseph.barnes@example.com', 'hashedpassword59', FALSE),
-- ('Victoria', 'Jenkins', 'victoria.jenkins@example.com', 'hashedpassword60', FALSE),
-- ('Samuel', 'Perry', 'samuel.perry@example.com', 'hashedpassword61', FALSE),
-- ('Luna', 'Long', 'luna.long@example.com', 'hashedpassword62', FALSE),
-- ('Jackson', 'Patterson', 'jackson.patterson@example.com', 'hashedpassword63', FALSE),
-- ('Penelope', 'Hughes', 'penelope.hughes@example.com', 'hashedpassword64', FALSE),
-- ('Eli', 'Flores', 'eli.flores@example.com', 'hashedpassword65', FALSE),
-- ('Riley', 'Washington', 'riley.washington@example.com', 'hashedpassword66', FALSE),
-- ('Luke', 'Butler', 'luke.butler@example.com', 'hashedpassword67', FALSE),
-- ('Zoe', 'Simmons', 'zoe.simmons@example.com', 'hashedpassword68', FALSE),
-- ('Wyatt', 'Foster', 'wyatt.foster@example.com', 'hashedpassword69', FALSE),
-- ('Savannah', 'Gonzalez', 'savannah.gonzalez@example.com', 'hashedpassword70', FALSE),
-- ('Gabriel', 'Bryant', 'gabriel.bryant@example.com', 'hashedpassword71', FALSE),
-- ('Nora', 'Alexander', 'nora.alexander@example.com', 'hashedpassword72', FALSE),
-- ('Isaac', 'Hamilton', 'isaac.hamilton@example.com', 'hashedpassword73', FALSE),
-- ('Camila', 'Griffin', 'camila.griffin@example.com', 'hashedpassword74', FALSE),
-- ('Anthony', 'Hayes', 'anthony.hayes@example.com', 'hashedpassword75', FALSE),
-- ('Aubrey', 'Wood', 'aubrey.wood@example.com', 'hashedpassword76', FALSE),
-- ('Dylan', 'Graham', 'dylan.graham@example.com', 'hashedpassword77', FALSE),
-- ('Eleanor', 'Cruz', 'eleanor.cruz@example.com', 'hashedpassword78', FALSE),
-- ('Grayson', 'Ortiz', 'grayson.ortiz@example.com', 'hashedpassword79', FALSE),
-- ('Hazel', 'Long', 'hazel.long@example.com', 'hashedpassword80', FALSE),
-- ('Jaxon', 'Franklin', 'jaxon.franklin@example.com', 'hashedpassword81', FALSE),
-- ('Lily', 'Jenkins', 'lily.jenkins@example.com', 'hashedpassword82', FALSE),
-- ('Levi', 'Wells', 'levi.wells@example.com', 'hashedpassword83', FALSE),
-- ('Grace', 'Chavez', 'grace.chavez@example.com', 'hashedpassword84', FALSE),
-- ('Isaiah', 'Collins', 'isaiah.collins@example.com', 'hashedpassword85', FALSE),
-- ('Elizabeth', 'Simmons', 'elizabeth.simmons@example.com', 'hashedpassword86', FALSE),
-- ('Andrew', 'Fisher', 'andrew.fisher@example.com', 'hashedpassword87', FALSE),
-- ('Scarlett', 'Henderson', 'scarlett.henderson@example.com', 'hashedpassword88', FALSE),
-- ('Connor', 'Ross', 'connor.ross@example.com', 'hashedpassword89', FALSE),
-- ('Zoey', 'Torres', 'zoey.torres@example.com', 'hashedpassword90', FALSE),
-- ('Nathan', 'Scott', 'nathan.scott@example.com', 'hashedpassword91', FALSE),
-- ('Madison', 'Flores', 'madison.flores@example.com', 'hashedpassword92', FALSE),
-- ('Aaron', 'Reed', 'aaron.reed@example.com', 'hashedpassword93', FALSE),
-- ('Brooklyn', 'Stewart', 'brooklyn.stewart@example.com', 'hashedpassword94', FALSE),
-- ('Landon', 'Morris', 'landon.morris@example.com', 'hashedpassword95', FALSE),
-- ('Addison', 'Morales', 'addison.morales@example.com', 'hashedpassword96', FALSE),
-- ('Evan', 'Murphy', 'evan.murphy@example.com', 'hashedpassword97', FALSE),
-- ('Ellie', 'Cook', 'ellie.cook@example.com', 'hashedpassword98', FALSE),
-- ('Carson', 'Rogers', 'carson.rogers@example.com', 'hashedpassword99', FALSE),
-- ('Hannah', 'Rivera', 'hannah.rivera@example.com', 'hashedpassword100', FALSE);
