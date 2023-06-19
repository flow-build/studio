export default class EmptyPalette {
  constructor(create, elementFactory, palette, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    return {};
  }
}

EmptyPalette.$inject = ["create", "elementFactory", "palette", "translate"];
