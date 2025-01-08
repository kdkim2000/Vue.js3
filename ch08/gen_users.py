import json
import random
import string

# Define roles with distribution weights
roles_with_weights = {
    "Admin": 0.05,  # 5%
    "Editor": 0.10,  # 10%
    "Contributor": 0.25,  # 25%
    "Viewer": 0.60   # 60%
}

# Define popular email domains in Korea
email_domains = [
    "naver.com", "daum.net", "gmail.com", "yahoo.com",
    "hanmail.net", "kakao.com", "outlook.com", "icloud.com",
    "nate.com", "hotmail.com"
]

# Generate weighted random roles
def get_random_role():
    return random.choices(
        population=list(roles_with_weights.keys()),
        weights=list(roles_with_weights.values()),
        k=1
    )[0]

# Generate a random password with at least 10 characters
# Includes at least one uppercase, one lowercase, one digit, and one special character
def generate_password(length=10):
    if length < 10:
        raise ValueError("Password length must be at least 10 characters.")
    
    all_characters = string.ascii_letters + string.digits + string.punctuation
    password = random.choices(string.ascii_lowercase, k=4) + \
               random.choices(string.ascii_uppercase, k=2) + \
               random.choices(string.digits, k=2) + \
               random.choices(string.punctuation, k=2)
    
    # Fill the remaining characters randomly and shuffle to ensure randomness
    password += random.choices(all_characters, k=length - len(password))
    random.shuffle(password)
    return ''.join(password)

# Sample names
names = [
    "Chris Miller", "Casey Smith", "Robin Johnson", "Emma Davis",
    "Michael Brown", "Sophia Wilson", "Olivia Anderson", "Liam Jones",
    "Noah Garcia", "James White", "Mia Rodriguez", "Ethan Martinez"
]

# Initialize data structure
data = {
    "users": []
}

# Generate 120 sample users
for i in range(1, 121):
    name = random.choice(names)
    first_name, last_name = name.split()
    email_domain = random.choice(email_domains)
    email = f"{first_name.lower()}.{last_name.lower()}{i}@{email_domain}"
    role = get_random_role()
    active = random.choice([True, False])
    passwd = generate_password()
    data["users"].append({
        "id": str(i),
        "name": name,
        "email": email,
        "role": role,
        "active": active,
        "passwd": passwd
    })

# Save the data to db_120_users.json
file_path = '/mnt/data/db_120_users.json'
with open(file_path, 'w') as f:
    json.dump(data, f, indent=2)

print(f"File saved to {file_path}")
