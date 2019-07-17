import Handler from "../handler";

class Splits extends Handler {
	constructor(chunker, polisher, caller) {
		super(chunker, polisher, caller);
	}

	afterPageLayout(pageElement, page, breakToken, chunker) {
		let splits = Array.from(pageElement.querySelectorAll("[data-split-from]"));
		let pages = pageElement.parentNode;
		let index = Array.prototype.indexOf.call(pages.children, pageElement);
		let prevPage;

		if (index === 0) {
			return;
		}

		prevPage = pages.children[index - 1];

		let from; // Capture the last from element
		splits.forEach((split) => {
			let ref = split.dataset.ref;
			from = prevPage.querySelector("[data-ref='"+ ref +"']:not([data-split-to])");

			if (from) {
				from.dataset.splitTo = ref;

				if (!from.dataset.splitFrom) {
					from.dataset.splitOriginal = true;
				}

			}
		});

		// Fix alignment on the deepest split element
		if (from) {
			this.handleAlignment(from);
		}
	}

	handleAlignment(node) {
		let styles = window.getComputedStyle(node);
		let align = styles["text-align"];
		let alignLast = styles["text-align-last"];

		if (align === "justify" && alignLast === "auto") {
			node.dataset.forceTextAlignLast = "justify";
		}
	}

}

export default Splits;
