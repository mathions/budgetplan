"use client"

import React, {useState} from "react" 
import { Eye, EyeSlash, Lock1 } from "iconsax-react"
import { Button } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false)
		const disabled = props.value === "" || props.value === undefined || props.disabled

		return (
			<div className="relative">
				<Lock1 className="h-4 w-4 absolute left-4 top-[14px]"/>
				<Input
					type={showPassword ? "text" : "password"}
					className={cn("hide-password-toggle pl-10 pr-10", className)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-1 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={() => setShowPassword((prev) => !prev)}
					disabled={disabled}
				>
					{showPassword && !disabled ? (
						<Eye
							className="h-4 w-4"
							aria-hidden="true"
						/>
					) : (
						<EyeSlash
							className="h-4 w-4"
							aria-hidden="true"
						/>
					)}
					<span className="sr-only">
						{showPassword ? "Hide password" : "Show password"}
					</span>
				</Button>

				{/* hides browsers password toggles */}
				<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
			</div>
		)
	},
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }