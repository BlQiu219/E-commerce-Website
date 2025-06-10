import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import google.generativeai as genai

# Cấu hình môi trường
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

app = Flask(__name__)
CORS(app)

# 🔹 Cấu hình Gemini
genai.configure(api_key="AIzaSyAmLesw2keGhIrZPMEyYJUs1PUqIidIWFU")
model = genai.GenerativeModel("gemini-2.0-flash")

# 🔹 Load dữ liệu
with open("data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

with open("data/store_info.json", "r", encoding="utf-8") as f:
    intro_info = json.load(f)

with open("data/terms.json", "r", encoding="utf-8") as f:
    terms_info = json.load(f)

# 🔹 Hàm phân loại
def classify_question(user_input):
    prompt = f"""
Bạn là hệ thống phân loại câu hỏi của chatbot bán hàng. Các loại câu hỏi gồm:

1. sản phẩm – hỏi về sản phẩm, giá, mô tả, loại...
2. thông tin cửa hàng – hỏi về địa chỉ, giờ mở cửa, liên hệ...
3. chào hỏi – như 'xin chào', 'bạn là ai'...
4. điều khoản – hỏi về đổi trả, bảo hành, mua hàng...

Trả về đúng **1 nhãn**: "sản phẩm", "thông tin cửa hàng", "chào hỏi", "điều khoản".

Câu hỏi: "{user_input}"
Kết quả:
"""
    response = model.generate_content(prompt)
    result = response.text.strip().lower()
    if result not in ["sản phẩm", "thông tin cửa hàng", "chào hỏi", "điều khoản"]:
        return "không xác định"
    return result

# 🔹 Tìm điều khoản
def search_terms(query):
    for term in terms_info:
        if term["title"].lower() in query.lower():
            return term
    return None

@app.route("/chat", methods=["POST"])
@cross_origin()
def chat():
    data = request.json
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Vui lòng nhập câu hỏi!"})

    category = classify_question(user_message)

    # 🔹 Dùng context khác nhau theo loại câu hỏi
    if category == "sản phẩm":
        # Dẫn toàn bộ danh sách sản phẩm vào prompt
        product_list = "\n".join(
            [f"- {p['NAME']} (Giá: {p['PRICE']}): {p['DESCRIPTION']}" for p in products]
        )
        context = f"Danh sách sản phẩm:\n{product_list}\n\nCâu hỏi: {user_message}"
    elif category == "thông tin cửa hàng":
        context = (
            f"Thông tin cửa hàng:\n"
            f"Tên: {intro_info['name']}\n"
            f"Địa chỉ: {intro_info['address']}\n"
            f"Giờ mở cửa: {intro_info['open_hours']}\n"
            f"Liên hệ: {intro_info['contact']}\n"
            f"{intro_info['description']}\n\nCâu hỏi: {user_message}"
        )
    elif category == "chào hỏi":
        context = f"Khách đang chào hỏi. Trả lời thân thiện với mô tả: {intro_info['description']}"
    elif category == "điều khoản":
        term = search_terms(user_message)
        if term:
            context = f"Điều khoản: {term['title']} - {term['content']}\n\nCâu hỏi: {user_message}"
        else:
            context = f"Các điều khoản: {[t['title'] for t in terms_info]}\n\nCâu hỏi: {user_message}"
    else:
        return jsonify({"reply": "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn."})

    # 🔹 Sinh câu trả lời với context
    prompt = f"{context}\n\nTrả lời khách hàng một cách tự nhiên và ngắn gọn:"
    response = model.generate_content(prompt)

    return jsonify({"reply": response.text.replace("\n", "<br>")})

if __name__ == "__main__":
    app.run(debug=True)
