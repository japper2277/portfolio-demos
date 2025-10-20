# Artwork Formatting Migration Script

This script fixes formatting and spacing issues in artwork titles throughout your Sanity CMS.

## What it fixes

- Removes spaces before commas (e.g., `"Canvas ,"` → `"Canvas,"`)
- Ensures spaces after commas (e.g., `"Canvas,8x10"` → `"Canvas, 8x10"`)
- Standardizes format: `"Medium on Surface, dimensions"`

## Setup

### 1. Get your Sanity API Token

1. Go to https://sanity.io/manage
2. Select your project: **Anjelina Portfolio**
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name it: `Migration Script`
6. Permissions: **Editor**
7. Copy the token

### 2. Set the environment variable

**macOS/Linux:**
```bash
export SANITY_API_TOKEN="your-token-here"
```

**Windows (Command Prompt):**
```cmd
set SANITY_API_TOKEN=your-token-here
```

**Windows (PowerShell):**
```powershell
$env:SANITY_API_TOKEN="your-token-here"
```

## Running the script

```bash
npm run migrate:fix-formatting
```

## What to expect

The script will:
1. Fetch all artworks from your Sanity dataset
2. Check each artwork's medium and dimensions for formatting issues
3. Show you what changes will be made
4. Update the artworks in your CMS
5. Display a summary of changes

Example output:
```
Found 12 artworks to process

✓ "Sunset Dreams" - already formatted correctly

📝 Updating "I feel like I'm made out of light":
   Dimensions: "8x10 in" → "8x10 in"
   ✓ Updated successfully

✨ Migration complete!
   Total artworks: 12
   Updated: 1
   Skipped: 11
```

## Safety

- The script uses a **dry-run approach** by showing you changes before applying them
- You can review the changes in the console output
- All changes are reversible through Sanity Studio's history feature

## After running

Check your portfolio at https://your-portfolio-url.com to verify the changes look correct.
