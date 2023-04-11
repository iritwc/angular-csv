import {ErrorHandler} from '@angular/core';
import {MessageService} from './message.service';

export class AppErrorHandler implements ErrorHandler {
    constructor(private messageService: MessageService) {}

    handleError(error) {
        this.messageService.add(error.toString());
    }
}
