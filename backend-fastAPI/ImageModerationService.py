import requests
import json
import base64

import os
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()

load_dotenv(dotenv_path)
SIGHTENGINER_API_USER = os.getenv("SIGHTENGINER_API_USER")
SIGHTENGINER_API_SECRET = os.getenv("SIGHTENGINER_API_SECRET")
OPENROUTER_LLAMA_TOKEN = os.getenv("OPENROUTER_LLAMA_TOKEN")

class ImageModerationService:

    def generate_safety_report(self, sightengine_response: dict) -> dict:
        report = {
            "summary": "Safe",
            "issues": [],
            "details": {}
        }

        def extract_high_confidence(data, threshold=0.5):
            return {k: v for k, v in data.items() if isinstance(v, (int, float)) and v >= threshold}

        # Nudity
        nudity = sightengine_response.get("nudity", {})
        suggestive = extract_high_confidence(nudity.get("suggestive_classes", {}))
        if nudity.get("none", 0) < 0.9:
            report["issues"].append("Potential Nudity")
            report["details"]["nudity"] = {
                "sexual_activity": nudity.get("sexual_activity"),
                "sexual_display": nudity.get("sexual_display"),
                "suggestive": suggestive,
                "context": nudity.get("context")
            }

        # Weapons
        weapons = extract_high_confidence(sightengine_response.get("weapon", {}).get("classes", {}))
        if weapons:
            report["issues"].append("Weapon Detected")
            report["details"]["weapons"] = weapons

        # Gore
        gore = sightengine_response.get("gore", {})
        gore_prob = gore.get("prob", 0)
        if gore_prob > 0.5:
            report["issues"].append("Graphic Gore")
            report["details"]["gore"] = extract_high_confidence(gore.get("classes", {}))

        # Offensive Symbols
        offensive = extract_high_confidence(sightengine_response.get("offensive", {}))
        if offensive:
            report["issues"].append("Offensive Symbols")
            report["details"]["offensive"] = offensive

        # Violence
        violence = sightengine_response.get("violence", {})
        violence_prob = violence.get("prob", 0)
        if violence_prob > 0.5:
            report["issues"].append("Violence Detected")
            report["details"]["violence"] = extract_high_confidence(violence.get("classes", {}))

        # Self-harm
        self_harm = sightengine_response.get("self-harm", {})
        if self_harm.get("prob", 0) > 0.5:
            report["issues"].append("Self-harm Detected")
            report["details"]["self_harm"] = self_harm.get("type", {})

        # Textual content
        text_content = sightengine_response.get("text", {})
        concerning_text = {k: v for k, v in text_content.items() if isinstance(v, list) and v}
        if concerning_text:
            report["issues"].append("Concerning Text Detected")
            report["details"]["text"] = concerning_text

        # Final Summary
        if report["issues"]:
            report["summary"] = "Unsafe - " + ", ".join(report["issues"])
        return report

    def moderateImage_Experimental(self, encoded_image):
        response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_LLAMA_TOKEN}",
            "Content-Type": "application/json",
        },
        data=json.dumps({
            "model": "meta-llama/llama-3.2-11b-vision-instruct:free",
            "messages": [
            {
                "role": "user",
                "content": [
                {
                    "type": "text",
                    "text": "What is in this image?"
                },
                {
                    "type": "image_url",
                    "image_url": {
                    "url": f"data:image/jpg;base64,{encoded_image}"
                    # "url": "https://sightengine.com/assets/img/examples/example7.jpg"
                    }
                }
                ]
            }
            ],
            
        })
        )
        return response

    def moderateImage(self, image_data):
        
        response = requests.post(
            "https://api.sightengine.com/1.0/check.json",
            files={'media': image_data},
            data={
                'models': 'nudity-2.1,weapon,offensive-2.0,text-content,gore-2.0,violence,self-harm',
                'api_user': f'{SIGHTENGINER_API_USER}',
                'api_secret': f'{SIGHTENGINER_API_SECRET}'
            }
        )

        parsed_response = self.generate_safety_report(json.loads(response.text))
        return parsed_response

# if __name__ == "__main__":
    
#     with open('test.jpg', 'rb') as image_file:
#         # contents = image_file.read()
#         # base64_bytes = base64.b64encode(image_file.read()).decode("utf-8")
#         # print(base64_bytes)
#         contents = image_file.read()
        
#         imageModeration = ImageModerationService()
#         response = imageModeration.moderateImage(contents)
#         print(response)

#         # response = moderateImage(base64_bytes)
#         # print(response)
#         # print(response.text)
#         # print(response.reason)
#         # output = json.loads(response.text)
#         # print(output)

#         # print(response.reason)
#         # print(response.text)
#         # print(response)

