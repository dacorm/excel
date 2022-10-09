import {ExcelComponent, OptionsI} from "../../core/ExcelComponent";
import {DomListenerProps} from "../../core/DomListener";

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor(root: DomListenerProps, options: OptionsI) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        });
    }

    toHTML(): string {
        return ` <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>

      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>

      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>

      <div class="button">
        <i class="material-icons">format_underlined</i>
      </div>
`
    }

    onClick(event: MouseEvent) {
        console.log(event.target)
    }
}