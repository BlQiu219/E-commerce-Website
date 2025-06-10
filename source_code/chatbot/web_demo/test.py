# main.py
from chatbot import load_model, predict, TransformerClassifier


# Tải mô hình
model = load_model("model.pkl")

# Dự đoán ý định
text = "có bán iphone 16 không"
result = predict(text, model)
print(f"Ý định: {result}")
