import {test, expect, Page} from '@playwright/test'
import { Elements } from './elements'
import { RadioButton } from './radioButton'

export class PageManager{
    private readonly page : Page
    private readonly elements : Elements
    private readonly radioButton : RadioButton

    constructor(page : Page){
        this.page = page
        this.elements = new Elements(this.page)
        this.radioButton = new RadioButton(this.page)
    }

    onElements(){
        return this.elements
    }

    onRadioButton(){
        return this.radioButton
    }

}