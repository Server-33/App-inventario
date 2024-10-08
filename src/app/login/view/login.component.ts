import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    class="bg-black text-white flex min-h-screen flex-col items-center  sm:justify-center sm:pt-0"
  >
    <a href="#">
      <div
        class="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2"
      >
        <div>
          <img class="h-8 w-auto" [src]="logo" alt="" />
        </div>
        KyclopsRadio
      </div>
    </a>
    <div class="relative mt-12 w-full max-w-lg sm:mt-10">
      <div
        class="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
        bis_skin_checked="1"
      ></div>
      <div
        class="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none"
      >
        <div class="flex flex-col p-6">
          <p class="mt-1.5 text-sm font-medium text-white/50">
            Welcome back, enter your credentials to continue.
          </p>
        </div>
        <div class="p-6 pt-0">
          <form>
            <div>
              <div>
                <div
                  class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30"
                >
                  <div class="flex justify-between">
                    <label
                      class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400"
                      >Username</label
                    >
                    <div class="absolute right-3 translate-y-2 text-green-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    autocomplete="off"
                    class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div>
                <div
                  class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30"
                >
                  <div class="flex justify-between">
                    <label
                      class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400"
                      >Password</label
                    >
                  </div>
                  <div class="flex items-center">
                    <input
                      type="password"
                      name="password"
                      class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  class="outline-none focus:outline focus:outline-red-700"
                />
                <span class="text-xs">Remember me</span>
              </label>
            </div>
            <div class="mt-4 flex items-center justify-center gap-x-2">
              <button
                class="font-semibold hover:bg-red-800 hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-8 py-2"
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  logo = './assets/logo-w.png';
}
