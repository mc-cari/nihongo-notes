from pathlib import Path
from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:4321"
SCREENSHOT_DIR = Path("/tmp/nihongo-browser-check")
SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        headless=True,
        executable_path="/snap/bin/chromium",
        args=["--no-sandbox"],
    )

    desktop = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    console_errors = []
    desktop.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
    desktop.goto(BASE_URL, wait_until="networkidle")
    assert desktop.locator("h1").get_by_text("Grammar").is_visible()
    assert desktop.locator("nav[aria-label='Primary navigation'] a").count() == 5
    assert desktop.locator(".skip-link").evaluate("el => el.getBoundingClientRect().right < 0")
    class_titles = desktop.locator(".class-ribbon strong").all_inner_texts()
    assert class_titles.index("Questions at an izakaya") < class_titles.index("Time and daily actions")
    assert class_titles.index("At a convenience store") < class_titles.index("Time and daily actions")

    first_token = desktop.locator(".jp-token").first
    first_token.hover()
    popup = first_token.locator(".jp-token__popup")
    popup.wait_for(state="visible")
    assert "grammar" in popup.inner_text()
    assert "文法" not in popup.inner_text()
    first_token.focus()
    assert "is-current" in (first_token.get_attribute("class") or "")
    desktop.screenshot(path=str(SCREENSHOT_DIR / "home-desktop.png"), full_page=True)

    desktop.goto(f"{BASE_URL}/particles/", wait_until="networkidle")
    assert desktop.get_by_role("heading", name="Frame versus focus").is_visible()
    assert desktop.get_by_role("heading", name="Point versus scene").is_visible()
    desktop.screenshot(path=str(SCREENSHOT_DIR / "particles-desktop.png"), full_page=True)

    desktop.goto(f"{BASE_URL}/classes/minna-lesson-5/", wait_until="networkidle")
    assert desktop.get_by_role("heading", name="Going, coming, returning").is_visible()
    assert desktop.locator(".grammar-card").count() == 3
    desktop.locator(".recall-list summary").first.click()
    assert desktop.locator(".recall-list details").first.get_attribute("open") is not None
    assert desktop.locator(".skip-link").evaluate("el => el.getBoundingClientRect().right < 0")
    desktop.screenshot(path=str(SCREENSHOT_DIR / "lesson-desktop.png"), full_page=True)

    desktop.goto(f"{BASE_URL}/classes/izakaya-questions/", wait_until="networkidle")
    question_summary = desktop.locator("#question-slot header > p:not(.grammar-card__pattern)")
    assert question_summary.locator("ruby").count() == 1
    assert question_summary.locator("ruby").evaluate("el => [el.firstChild.textContent, el.querySelector('rt').textContent]") == ["何時", "なんじ"]
    origin_example = desktop.locator("#question-slot")
    assert origin_example.locator("[data-surface='お国']").count() == 1
    assert origin_example.locator("[data-surface='台湾']").count() == 1
    quantity_offer = desktop.locator("#quantity-offer")
    assert quantity_offer.locator("[data-surface='ビール']").count() == 1
    assert quantity_offer.locator("[data-surface='いくつ']").count() == 1
    assert quantity_offer.locator("[data-surface='お持ちしましょうか']").count() == 1
    quantity_token = quantity_offer.locator(".jp-token").nth(3)
    assert quantity_token.locator("ruby").evaluate("el => [el.firstChild.textContent, el.querySelector('rt').textContent]") == ["お持ちしましょうか", "おもちしましょうか"]
    quantity_token.hover()
    quantity_token.locator(".jp-token__popup").wait_for(state="visible")
    assert "shall I bring?" in quantity_token.locator(".jp-token__popup").inner_text()
    choice_examples = desktop.locator("#two-choice")
    assert choice_examples.locator("[data-surface='テーブル']").count() == 1
    assert choice_examples.locator("[data-surface='席']").count() == 1
    assert choice_examples.locator("[data-surface='お座敷']").count() == 2
    desktop.screenshot(path=str(SCREENSHOT_DIR / "izakaya-desktop.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    mobile.goto(BASE_URL, wait_until="networkidle")
    mobile_token = mobile.locator(".jp-token").first
    mobile_token.click()
    mobile_token.locator(".jp-token__popup").wait_for(state="visible")
    assert mobile.locator("html").evaluate("el => el.scrollWidth <= window.innerWidth")
    mobile.screenshot(path=str(SCREENSHOT_DIR / "home-mobile.png"), full_page=True)

    mobile.goto(f"{BASE_URL}/classes/izakaya-questions/", wait_until="networkidle")
    assert mobile.locator("#question-slot header").locator("ruby").count() == 1
    mobile_quantity_token = mobile.locator("#quantity-offer .jp-token").nth(3)
    mobile_quantity_token.click()
    mobile_quantity_token.locator(".jp-token__popup").wait_for(state="visible")
    assert mobile.locator("html").evaluate("el => el.scrollWidth <= window.innerWidth")
    mobile.screenshot(path=str(SCREENSHOT_DIR / "izakaya-mobile.png"), full_page=True)

    assert not console_errors, f"Console errors: {console_errors}"
    browser.close()

print(f"Browser smoke tests passed. Screenshots: {SCREENSHOT_DIR}")
