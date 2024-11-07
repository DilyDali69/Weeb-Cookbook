import pandas as pd

# Load the CSV file
file_path = '/mnt/data/recipes.csv'  # Adjust this path if needed
recipes_df = pd.read_csv(file_path)

# Function to clean and format ingredients and instructions
def clean_column(column, separator):
    cleaned = []
    for entry in column:
        if pd.isna(entry):  # Handle NaN entries
            cleaned.append("")
        else:
            # Split by the specified separator, trim whitespace, and join consistently
            items = [item.strip() for item in entry.split(separator) if item.strip()]
            cleaned.append(", ".join(items))
    return cleaned

# Clean up the 'Ingredients' column by ensuring each item is separated by a comma
recipes_df['Ingredients'] = clean_column(recipes_df['Ingredients'], ',')

# Clean up the 'Instructions' column by ensuring each step is separated by a period and listed clearly
recipes_df['Instructions'] = clean_column(recipes_df['Instructions'], '.')

# Save the cleaned CSV file
cleaned_file_path = '/mnt/data/cleaned_recipes.csv'
recipes_df.to_csv(cleaned_file_path, index=False)

print(f"Cleaned CSV saved as: {cleaned_file_path}")
