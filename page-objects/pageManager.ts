import {test, expect, Page} from '@playwright/test'
import { Elements } from './elements'

export class PageManager{
    private readonly page : Page
    private readonly elements : Elements

    constructor(page : Page){
        this.page = page
        this.elements = new Elements(this.page)
    }

    onElements(){
        return this.elements
    }

}