/*
*All common directives
*Note : On add new directive please add it in directives.module.ts file also
*/
import { Directive, ElementRef, AfterViewInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
declare const $: any;


/*
*For prevent to type all except 1 to 9 and backspace,etc
*/
@Directive({ selector: '[appNumbersOnly]' })
export class NumbersOnlyDirective {
  @HostListener('keydown', ['$event']) onKeyDown(e: any) {
    console.log(e.keyCode);
    // Allow: backspace, delete, tab, escape, enter and . (110 for . which is removed)
    if ([46, 8, 9, 27, 13, 190, 116].indexOf(e.keyCode) !== -1 ||
      (e.keyCode == 65 && e.ctrlKey === true) ||
      (e.keyCode == 67 && e.ctrlKey === true) ||
      (e.keyCode == 86 && e.ctrlKey === true) ||
      (e.keyCode == 116 && e.ctrlKey === true) ||
      (e.keyCode == 88 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
}


/*
*For select2
*/
// @Directive({
//   selector: '[appSelect2]'
// })
// export class Select2Directive implements AfterViewInit {
//   constructor(private el: ElementRef) {}

//   ngAfterViewInit(): void {
//     $('.select2Class').select2();
//   }
// }

/*
*For emoji
*/
// @Directive({
//   selector: '[appEmojiPicker]'
// })
// export class EmojiPickerDirective implements AfterViewInit {
//   // constructor(el: ElementRef) {}

//   ngAfterViewInit(): void {
//     // Initializes and creates emoji set from sprite sheet
//     window.emojiPicker = new EmojiPicker({
//       emojiable_selector: '[data-emojiable=true]',
//       assetsPath: 'assets/images/emoji-custom/img',
//       popupButtonClasses: 'fa fa-smile-o'
//     });
//     // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
//     // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
//     // It can be called as many times as necessary; previously converted input fields will not be converted again
//     window.emojiPicker.discover();
//   }
// }

// @Directive({ selector: '[myHighlight]' })
// export class HighlightDirective {
//     constructor(el: ElementRef) {
//        el.nativeElement.style.backgroundColor = 'yellow';
//     }
// }
