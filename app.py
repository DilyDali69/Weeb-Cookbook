from flask import Flask, jsonify, send_from_directory, render_template
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__, static_folder='assets', template_folder='.')

CORS(app)

# Define a route to clean and serve the CSV data
@app.route('/api/recipes')
def get_cleaned_recipes():
    # Load and clean the CSV
    df = pd.read_csv('assets/recipes.csv')
    
    # Clean up the columns
    def clean_column(column, separator):
        cleaned = []
        for entry in column:
            if pd.isna(entry):
                cleaned.append("")
            else:
                items = [item.strip() for item in entry.split(separator) if item.strip()]
                cleaned.append(", ".join(items))
        return cleaned

    # Apply cleaning
    df['Ingredients'] = clean_column(df['Ingredients'], ',')
    df['Instructions'] = clean_column(df['Instructions'], '.')
    
    # Convert the DataFrame to JSON format
    return jsonify(df.to_dict(orient='records'))

# Serve static files (JavaScript, CSS, etc.)
@app.route('/assets')
def serve_static_files(path):
    return send_from_directory('assets', path)

# Serve the HTML file
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

