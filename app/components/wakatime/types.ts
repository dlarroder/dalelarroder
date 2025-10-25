export interface WakaTimeAllTimeStats {
	daily_average: number; // Average coding activity per day (in seconds)
	decimal: string; // Total coding activity in decimal format (e.g., "5.25")
	digital: string; // Total coding activity in digital clock format (e.g., "5:15")
	is_up_to_date: boolean; // True if stats are current
	percent_calculated: number; // 0-100: Percentage of stats calculated
	range: {
		end: string; // End datetime (ISO 8601 UTC format)
		end_date: string; // End date (YYYY-MM-DD format)
		end_text: string; // Human-readable end date
		start: string; // Start datetime (ISO 8601 UTC format)
		start_date: string; // Start date (YYYY-MM-DD format)
		start_text: string; // Human-readable start date
		timezone: string; // Timezone in Olson format (e.g., "America/New_York")
	};
	text: string; // Total logged time as human-readable string
	timeout: number; // Keystroke timeout setting (in minutes)
	total_seconds: number; // Total logged time (in seconds)
}

export interface UserStats {
	best_day: {
		date: string; // Best day (YYYY-MM-DD format)
		text: string; // Human-readable best day
		total_seconds: number; // Total logged time on best day (in seconds)
	};
	human_readable_daily_average: string; // Average coding activity per day (in human-readable format)
	human_readable_total: string; // Total logged time in human-readable format
	daily_average: number; // Average coding activity per day (in seconds)
	total_seconds: number; // Total logged time (in seconds)
	total_seconds_including_other_language: number; // Total logged time including non-coding activity (in seconds)
	projects: [
		{
			name: string; // Project name
			total_seconds: number; // Total logged time for project (in seconds)
			percent: number; // Percentage of total logged time for project
			decimal: string; // Total logged time for project in decimal format (e.g., "5.25")
			digital: string; // Total logged time for project in digital clock format (e.g., "5:15")
			text: string; // Total logged time for project as human-readable string
		},
	];
}
